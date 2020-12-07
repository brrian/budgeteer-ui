import { cloneDeep } from 'lodash-es';
import { Transaction } from '../../../graphql/models';

interface SplitTransaction {
  amount: number;
  categoryId: string;
  disabled?: boolean;
  note?: string;
}

type PartialTransaction = Partial<Transaction> & Pick<Transaction, 'id' | 'date' | 'splits'>;

export default function applyTransactionSplit(
  transaction: Transaction,
  splitIndex: number | undefined,
  split: SplitTransaction
): PartialTransaction {
  const transactionChanges: PartialTransaction = {
    date: transaction.date,
    id: transaction.id,
    splits: cloneDeep(transaction.splits),
  };

  if (splitIndex !== undefined) {
    transactionChanges.splits[splitIndex].amount -= split.amount;
  } else {
    transactionChanges.amount = transaction.amount - split.amount;
  }

  // If we have a split index, increment it so we add the split _after_ the specified split
  const newSplitIndex = (splitIndex ?? -1) + 1;

  transactionChanges.splits.splice(newSplitIndex, 0, {
    disabled: false,
    note: '',
    ...split,
  });

  return transactionChanges;
}
