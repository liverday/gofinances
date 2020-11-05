import { Request, Response } from 'express';
import { getCustomRepository, getRepository } from 'typeorm';

import TransactionsRepository from '../../../../../modules/transactions/repositories/TransactionsRepository';
import Category from '../../../../../modules/categories/entities/Category';

export default class GetTransactionsCountByCategoryController {
  async index(req: Request, res: Response): Promise<Response> {
    const { id: user_id } = req.user;
    const transactionsRepository = getCustomRepository(TransactionsRepository);
    const categoriesRepository = getRepository(Category);

    const transactionsByCategory = await transactionsRepository.getTransactionCountByCategory(
      user_id,
    );

    const categories = await categoriesRepository.find({
      where: {
        user_id,
      },
    });

    categories.forEach(category => {
      const found = transactionsByCategory.find(
        transactionCategory => transactionCategory.category_id === category.id,
      );

      if (found) category.transactionsCount = parseInt(found.transactions, 10);
    });

    return res.json(categories);
  }
}
