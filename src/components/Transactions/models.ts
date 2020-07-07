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
