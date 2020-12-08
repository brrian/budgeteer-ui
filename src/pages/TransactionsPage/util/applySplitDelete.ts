import { cloneDeep } from 'lodash-es';
import { Transaction } from '../../../graphql/models';

type PartialTransaction = Partial<Transaction> & Pick<Transaction, 'id' | 'date' | 'splits'>;

export default function applySplitDelete(
  transaction: Transaction,
  splitIndex: number
): PartialTransaction {
  const transactionChanges: PartialTransaction = {
    amount: transaction.amount + transaction.splits[splitIndex].amount, // Add the split amount back to the original transaction
    date: transaction.date,
    id: transaction.id,
    splits: cloneDeep(transaction.splits),
  };

  transactionChanges.splits.splice(splitIndex, 1);

  return transactionChanges;
}
