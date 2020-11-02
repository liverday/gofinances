import { EntityRepository, Repository } from 'typeorm';
import { endOfDay, addDays } from 'date-fns';

import Transaction from '../entities/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface TransactionsGroupedByCategory {
  category_id: string;
  transactions: string;
}
@EntityRepository(Transaction)
class TransactionsRepository extends Repository<Transaction> {
  public async getBalance(user_id: string): Promise<Balance> {
    const transactions = await this.find({ where: { user_id } });

    const defaultObject: Balance = {
      total: 0.0,
      income: 0.0,
      outcome: 0.0,
    };

    const balance = transactions.reduce((acc, current): Balance => {
      if (current.type === 'income') acc.income += current.value;
      else acc.outcome += current.value;

      return acc;
    }, defaultObject);

    balance.total = balance.income - balance.outcome;
    return balance;
  }

  public async getTransactionCountByCategory(
    user_id: string,
  ): Promise<TransactionsGroupedByCategory[]> {
    const transactionsGroupedByCategory = await this.createQueryBuilder(
      'transactions',
    )
      .select('category_id')
      .addSelect('COUNT(*)', 'transactions')
      .where('transactions.user_id = :user_id', { user_id })
      .groupBy('transactions.category_id')
      .getRawMany();

    return transactionsGroupedByCategory;
  }

  public async getMaxTransactionValueByType(
    user_id: string,
    type: 'income' | 'outcome',
  ): Promise<number> {
    const data = await this.createQueryBuilder('transactions')
      .select('MAX(value)', 'value')
      .where('transactions.user_id = :user_id', { user_id })
      .andWhere('transactions.type = :type', { type })
      .getRawOne();

    return data.value;
  }

  public async getMostFrequentCategory(user_id: string): Promise<string> {
    const { category_id } = await this.createQueryBuilder('transactions')
      .select('category_id')
      .addSelect('COUNT(*)', 'count')
      .where('transactions.user_id = :user_id', { user_id })
      .groupBy('transactions.category_id')
      .orderBy('2', 'DESC')
      .getRawOne();

    return category_id;
  }

  public async getBalanceGraph(
    user_id: string,
    startDate: Date,
    endDate: Date,
    unit = 'day',
  ): Promise<any[]> {
    const entries = await this.createQueryBuilder('transactions')
      .select(
        `EXTRACT(EPOCH FROM date_trunc(:unit, created_at)) * 1000`,
        'point',
      )
      .addSelect('type')
      .addSelect('SUM(value)', 'value')
      .where('user_id = :user_id', { user_id })
      .andWhere('created_at BETWEEN :startDate AND :endDate', {
        startDate: startDate.toISOString(),
        endDate: endOfDay(addDays(endDate, 1)).toISOString(),
      })
      .setParameter('unit', unit)
      .orderBy('1')
      .groupBy('1')
      .addGroupBy('2')
      .getRawMany();

    return entries;
  }
}

export default TransactionsRepository;
