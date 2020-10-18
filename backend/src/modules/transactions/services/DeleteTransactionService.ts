import { getCustomRepository } from 'typeorm';

import TransactionsRepository from '../repositories/TransactionsRepository';

import AppError from '../../../shared/errors/AppError';

interface Request {
  user_id: string;
  id: string;
}

class DeleteTransactionService {
  public async execute({ user_id, id }: Request): Promise<void> {
    const transactionRepository = getCustomRepository(TransactionsRepository);

    const transaction = await transactionRepository.findOne({
      where: { id, user_id },
    });

    if (!transaction) throw new AppError('Transaction not found');

    await transactionRepository.remove(transaction);
  }
}

export default DeleteTransactionService;
