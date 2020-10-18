import csvParse from 'csv-parse';
import fs from 'fs';
import { getCustomRepository, getRepository, In } from 'typeorm';
import Transaction from '../entities/Transaction';
import TransactionsRepository from '../repositories/TransactionsRepository';
import Category from '../../categories/entities/Category';

interface Request {
  user_id: string;
  path: string;
}
class ImportTransactionsService {
  async execute({ user_id, path }: Request): Promise<Transaction[]> {
    const transactionsRepository = getCustomRepository(TransactionsRepository);
    const categoryRepository = getRepository(Category);
    const readCSVStream = fs.createReadStream(path);
    const parseStream = csvParse({
      from_line: 2,
      ltrim: true,
      rtrim: true,
    });

    const parseCSV = readCSVStream.pipe(parseStream);

    const lines: any[] = [];

    parseCSV.on('data', line => {
      lines.push(line);
    });

    await new Promise((resolve, _) => {
      parseCSV.on('end', resolve);
    });

    const categories: any[] = [];
    const transactions: any[] = [];

    lines.forEach(line => {
      transactions.push({
        title: line[0],
        type: line[1],
        value: parseFloat(line[2]),
        category: line[3],
      });

      if (!categories.includes(line[3])) categories.push(line[3]);
    });

    const existentCategories = await categoryRepository.find({
      where: {
        title: In(categories),
      },
    });

    const mapExistentCategories = existentCategories.reduce(
      (acc: any, curr: Category) => {
        acc[curr.title] = curr.id;
        return acc;
      },
      {},
    );

    const categoriesToAdd = categories.filter(
      category => !(category in mapExistentCategories),
    );

    const newCategories = categoryRepository.create(
      categoriesToAdd.map(category => ({
        user_id,
        title: category,
        icon: 'fa/FaAsterisk',
        background_color_light: '#363f5f',
        background_color_dark: '#9A9A9A',
      })),
    );

    await categoryRepository.save(newCategories);

    const transactionsToCreate = transactions.map((transaction: any) => {
      let categoryId = '';
      if (mapExistentCategories[transaction.category]) {
        categoryId = mapExistentCategories[transaction.category];
      } else {
        const found = newCategories.find(
          category => category.title === transaction.category,
        );
        if (found) categoryId = found.id;
      }

      return {
        user_id,
        title: transaction.title,
        type: transaction.type,
        value: transaction.value,
        category_id: categoryId,
      };
    });

    const createdTransactions = transactionsRepository.create(
      transactionsToCreate,
    );

    await transactionsRepository.save(createdTransactions);

    await fs.promises.unlink(path);

    return createdTransactions;
  }
}

export default ImportTransactionsService;
