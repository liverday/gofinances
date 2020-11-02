import {
  isBefore,
  isEqual,
  getTime,
  addDays,
  subMonths,
  subWeeks,
  subHours,
  addWeeks,
  startOfDay,
  startOfWeek,
  setDate,
  endOfDay,
} from 'date-fns';

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
    return subHours(startOfWeek(date, { weekStartsOn: 1 }), 3);
  },
  month(date: Date): Date {
    return subHours(startOfWeek(subMonths(date, 1), { weekStartsOn: 1 }), 3);
  },
};

export function calculatePeriod(period: 'week' | 'month'): PeriodDate {
  const baseDate = new Date();
  const endDate = subHours(endOfDay(addDays(baseDate, 1)), 3);
  const startDate = startFn[period](baseDate);

  return {
    startDate,
    endDate,
  };
}
