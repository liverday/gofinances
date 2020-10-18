export interface Transaction {
  id: string;
  title: string;
  value: number;
  formattedValue: string;
  formattedDate: string;
  type: 'income' | 'outcome';
  category: {
    title: string;
    icon: string;
    background_color_light: string;
    background_color_dark: string;
  };
  created_at: Date;
}

export interface Balance {
  income: number;
  outcome: number;
  total: number;
}

export interface Pagination {
  page: number;
  pageSize: number;
  total: number;
}

export interface Sort {
  sort: string;
  direction: string;
}

export interface PaginationChange {
  selected: number;
}
