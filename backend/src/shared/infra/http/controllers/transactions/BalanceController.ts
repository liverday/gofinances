import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';

import TransactionsRepository from '../../../../../modules/transactions/repositories/TransactionsRepository';

export default class BalanceController {
  async index(req: Request, res: Response): Promise<Response> {
    const { id: user_id } = req.user;
    const transactionsRepository = getCustomRepository(TransactionsRepository);

    const balance = await transactionsRepository.getBalance(user_id);

    return res.json(balance);
  }
}
