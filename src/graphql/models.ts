import { QueryResultBase } from 'react-query';

export interface SuspendedQueryResult<TResult, TError = unknown>
  extends QueryResultBase<TResult, TError> {
  data: TResult;
}

export type Categories = Map<string, string>;

export interface Group {
  categories: Categories;
  id: string;
  name: string;
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
