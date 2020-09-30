interface TransactionCategory {
  id: string;
  title: string;
  created_at: string;
  updated_at: string;
}

export interface Transaction {
  id: string;
  title: string;
  type: 'total' | 'income' | 'outcome';
  value: number;
  category_id: string;
  created_at: string;
  updated_at: string;
  category: TransactionCategory;
}

export type Balance = {
  [key in 'total' | 'income' | 'outcome']: number;
};

export interface BalanceItem {
  type: 'total' | 'income' | 'outcome';
  value: number;
}
