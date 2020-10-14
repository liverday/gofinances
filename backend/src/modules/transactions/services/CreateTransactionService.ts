import { getRepository, getCustomRepository } from 'typeorm';
import AppError from '../../../shared/errors/AppError';

import TransactionsRepository from '../repositories/TransactionsRepository';

import Transaction from '../entities/Transaction';
import Category from '../entities/Category';

interface Request {
  user_id: string;
  title: string;
  type: 'income' | 'outcome';
  value: number;
  category: string;
}
class CreateTransactionService {
  public async execute({
    user_id,
    title,
    type,
    value,
    category,
  }: Request): Promise<Transaction> {
    const categoryRepository = getRepository(Category);
    const transactionRepository = getCustomRepository(TransactionsRepository);

    if (!['outcome', 'income'].includes(type)) throw new Error('Invalid type');

    if (type === 'outcome') {
      const { total } = await transactionRepository.getBalance(user_id);

      if (total < value) throw new AppError('Insufficient Balance', 400);
    }

    const findCategoryByTitle = await categoryRepository.findOne({
      where: {
        title: category,
      },
    });

    let categoryId: string;

    if (findCategoryByTitle) {
      categoryId = findCategoryByTitle.id;
    } else {
      const categoryToSave = categoryRepository.create({
        title: category,
        icon: 'fa/FaAsterisk',
        background_color_light: '#9A9A9A',
        background_color_dark: '#363f5f',
      });

      await categoryRepository.save(categoryToSave);

      categoryId = categoryToSave.id;
    }

    const transaction = transactionRepository.create({
      user_id,
      title,
      type,
      value,
      category_id: categoryId,
    });

    await transactionRepository.save(transaction);

    return transaction;
  }
}

export default CreateTransactionService;
