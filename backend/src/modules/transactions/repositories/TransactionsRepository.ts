import { EntityRepository, Repository } from 'typeorm';

import Transaction from '../entities/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
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
}

export default TransactionsRepository;
