import {
  isBefore,
  isEqual,
  getTime,
  addDays,
  subMonths,
  addWeeks,
  startOfWeek,
  endOfDay,
} from 'date-fns';

import { utcToZonedTime } from 'date-fns-tz';

const periodUnitsDict = {
  month: 'week',
  week: 'day',
};

const addFn = {
  week: addDays,
  month: addWeeks,
};

export function generateDateRange(
  startDate: Date,
  endDate: Date,
  period: 'week' | 'month',
): any {
  let curr = startDate;
  const result = [];

  while (isBefore(curr, endDate) || isEqual(curr, endDate)) {
    result.push(getTime(curr));
    curr = addFn[period](curr, 1);
  }

  return result;
}

export function getPeriodUnit(period: 'week' | 'month'): string {
  return periodUnitsDict[period];
}

interface PeriodDate {
  startDate: Date;
  endDate: Date;
}

const startFn = {
  week(date: Date): Date {
    return startOfWeek(date, { weekStartsOn: 1 });
  },
  month(date: Date): Date {
    return startOfWeek(subMonths(date, 1), { weekStartsOn: 1 });
  },
};

export function calculatePeriod(period: 'week' | 'month'): PeriodDate {
  const baseDate = utcToZonedTime(new Date(), 'America/Sao_Paulo');
  const endDate = endOfDay(baseDate);
  const startDate = startFn[period](baseDate);

  return {
    startDate,
    endDate,
  };
}
