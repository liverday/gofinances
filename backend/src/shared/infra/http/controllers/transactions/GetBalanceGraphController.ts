import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';

import TransactionRepository from '../../../../../modules/transactions/repositories/TransactionsRepository';

export default class GetBalanceGraphController {
  async(req: Request, res: Response): Promise<Response> {
    const transactionsRepository = getCustomRepository(TransactionRepository);
  }
}
