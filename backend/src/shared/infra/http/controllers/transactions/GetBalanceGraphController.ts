import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';

import TransactionRepository from '../../../../../modules/transactions/repositories/TransactionsRepository';
import {
  calculatePeriod,
  generateDateRange,
  getPeriodUnit,
} from '../../../date';

interface BalanceGraphResponse {
  income: [[number, number]];
  outcome: [[number, number]];
}

export default class GetBalanceGraphController {
  async index(req: Request, res: Response): Promise<Response> {
    const { id: user_id } = req.user;
    let { period } = req.query;

    if (!period) period = 'week';

    const { startDate, endDate } = calculatePeriod(period as 'week' | 'month');

    const transactionsRepository = getCustomRepository(TransactionRepository);

    const entries = await transactionsRepository.getBalanceGraph(
      user_id,
      startDate,
      endDate,
      getPeriodUnit(period as 'week' | 'month'),
    );

    const dateRange = generateDateRange(
      startDate,
      endDate,
      period as 'week' | 'month',
    );

    const result: BalanceGraphResponse = {
      income: dateRange.map((date: number) => [date, 0]),
      outcome: dateRange.map((date: number) => [date, 0]),
    };

    entries.forEach(entry => {
      const entryType = entry.type as 'income' | 'outcome';
      const foundIndex = result[entryType].findIndex(
        item => item[0] === entry.point,
      );

      if (foundIndex >= 0) {
        const [oldPoint, oldValue] = result[entryType][foundIndex];
        result[entryType][foundIndex] = [
          oldPoint,
          oldValue + parseFloat(entry.value),
        ];
      }
    });

    return res.json(result);
  }
}
