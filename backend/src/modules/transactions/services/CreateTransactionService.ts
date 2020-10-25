import { getRepository, getCustomRepository } from 'typeorm';
import AppError from '../../../shared/errors/AppError';

import TransactionsRepository from '../repositories/TransactionsRepository';

import Transaction from '../entities/Transaction';
import Category from '../../categories/entities/Category';

interface Request {
  user_id: string;
  title: string;
  type: 'income' | 'outcome';
  value: number;
  category_id: string;
}
class CreateTransactionService {
  public async execute({
    user_id,
    title,
    type,
    value,
    category_id,
  }: Request): Promise<Transaction> {
    const categoryRepository = getRepository(Category);
    const transactionRepository = getCustomRepository(TransactionsRepository);

    if (!['outcome', 'income'].includes(type)) throw new Error('Invalid type');

    if (type === 'outcome') {
      const { total } = await transactionRepository.getBalance(user_id);

      if (total < value) throw new AppError('Insufficient Balance');
    }

    const category = await categoryRepository.findOne(category_id);

    if (!category) throw new AppError('Invalid Category');

    const transaction = transactionRepository.create({
      user_id,
      title,
      type,
      value,
      category_id,
    });

    await transactionRepository.save(transaction);

    return transaction;
  }
}

export default CreateTransactionService;
