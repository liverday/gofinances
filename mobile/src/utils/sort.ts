import {Transaction} from '../services/interfaces';

export const sortTransactions = (transcations: Transaction[]): Transaction[] =>
  transcations.sort((a, b) => {
    if (a.created_at > b.created_at) {
      return -1;
    }
    if (a.created_at < b.created_at) {
      return 1;
    }
    return 0;
  });
