import { cloneDeep } from 'lodash-es';
import { Split, Transaction } from '../../../graphql/models';
import calculateAmount from './calculateAmount';

interface TransactionUpdates {
  amount?: string;
  categoryId?: string;
  disabled?: boolean;
  note?: string;
}

type PartialTransaction = Partial<Transaction> & Pick<Transaction, 'id' | 'date'>;

export default function applyTransactionUpdates(
  transaction: Transaction,
  splitIndex: number | undefined,
  updates: TransactionUpdates
): PartialTransaction {
  const transactionChanges: PartialTransaction = {
    date: transaction.date,
    id: transaction.id,
  };

  let transactionItem: PartialTransaction | Split = transactionChanges;
  if (splitIndex !== undefined) {
    transactionChanges.splits = cloneDeep(transaction.splits);
    transactionItem = transactionChanges.splits[splitIndex];
  }

  for (const [key, value] of Object.entries(updates)) {
    transactionItem[key as keyof TransactionUpdates] =
      key !== 'amount' ? value : calculateAmount(value);
  }

  return transactionChanges;
}
