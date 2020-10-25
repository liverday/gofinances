import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';

import TransactionsRepository from '../../../../../modules/transactions/repositories/TransactionsRepository';
import CreateTransactionService from '../../../../../modules/transactions/services/CreateTransactionService';
import DeleteTransactionService from '../../../../../modules/transactions/services/DeleteTransactionService';

export default class TransactionsController {
  async store(req: Request, res: Response): Promise<Response> {
    const { id } = req.user;
    const { title, value, type, category_id } = req.body;

    const createTransaction = new CreateTransactionService();

    const transaction = await createTransaction.execute({
      user_id: id,
      title,
      value,
      type,
      category_id,
    });

    return res.json(transaction);
  }

  async index(req: Request, res: Response): Promise<Response> {
    const { id } = req.user;
    const { sort, direction, page, pageSize } = req.query;

    let take = 6;
    let skip = 0;
    let order: object = {
      created_at: 'DESC',
    };

    if (sort && direction) {
      order = {
        [sort as string]: direction,
      };
    }

    if (page && pageSize) {
      take = parseInt(pageSize as string, 10);
      skip = take * (parseInt(page as string, 10) - 1);

      if (skip < 0) skip = 0;
    }

    const transactionRepository = getCustomRepository(TransactionsRepository);

    const [transactions, total] = await transactionRepository.findAndCount({
      where: { user_id: id },
      relations: ['category'],
      order,
      take,
      skip,
    });

    return res.json({
      transactions,
      pageCount: Math.ceil(total / take),
    });
  }

  async delete(req: Request, res: Response): Promise<Response> {
    const { id: user_id } = req.user;
    const { id } = req.params;

    const deleteTransaction = new DeleteTransactionService();

    await deleteTransaction.execute({ user_id, id });

    return res.status(204).send();
  }
}
