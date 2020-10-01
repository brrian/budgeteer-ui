export interface FetchGroupResponse {
  name: string;
}

export interface ValidateGroupResponse {
  isValid: boolean;
}

export type Categories = Map<string, Category>;

interface Category {
  id: string;
  label: string;
}

export interface Transaction {
  id: string;
  date: string;
  description: string;
  note: string | null;
  categoryId: string;
  amount: number;
  originalAmount: number;
  disabled: boolean;
  serviceId: string;
  splits: Split[];
}

interface Split {
  amount: number;
  categoryId: string;
  disabled: boolean;
  note: string | null;
}
