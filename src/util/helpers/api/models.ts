export interface FetchGroupResponse {
  name: string;
}

export interface ValidateGroupResponse {
  isValid: boolean;
}

export interface Categories {
  [category: string]: string;
}

export interface Transaction {
  id: string;
  date: string;
  description: string;
  note: string | null;
  categoryId: number;
  amount: number;
  originalAmount: number;
  disabled: boolean;
  serviceId: string;
  splits: Split[];
}

interface Split {
  amount: number;
  categoryId: number;
  disabled: boolean;
  note: string | null;
}
