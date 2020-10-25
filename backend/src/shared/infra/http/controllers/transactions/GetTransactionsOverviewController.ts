import { Request, Response } from 'express';
import { getCustomRepository, getRepository } from 'typeorm';

import TransactionsRepository from '../../../../../modules/transactions/repositories/TransactionsRepository';
import Category from '../../../../../modules/categories/entities/Category';

export default class GetTransactionsOverviewController {
  async index(req: Request, res: Response): Promise<Response> {
    const { id: user_id } = req.user;
    const transactionsRepository = getCustomRepository(TransactionsRepository);
    const categoryRepository = getRepository(Category);
    const promises = Promise.all([
      transactionsRepository.getMaxTransactionValueByType(user_id, 'income'),
      transactionsRepository.getMaxTransactionValueByType(user_id, 'outcome'),
      transactionsRepository.getMostFrequentCategory(user_id),
    ]);

    const [income, outcome, mostFrequentCategoryId] = await promises;

    const category = await categoryRepository.findOne(mostFrequentCategoryId);

    return res.json({
      income,
      outcome,
      category,
    });
  }
}
