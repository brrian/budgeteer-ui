import { gql } from 'graphql-request';
import { MutationResultPair, useMutation, useQueryCache } from 'react-query';
import useClient from '../util/hooks/useClient';
import { MonthOverview, Transaction } from './models';

type PartialTransaction = Partial<Transaction> & Pick<Transaction, 'id' | 'date'>;

interface DeleteTransactionSnapshot {
  cacheKey: unknown[];
  snapshot: MonthOverview;
}

export default function useDeleteTransactionMutation(): MutationResultPair<
  Transaction,
  unknown,
  PartialTransaction,
  DeleteTransactionSnapshot | undefined
> {
  const cache = useQueryCache();

  const client = useClient();

  return useMutation(
    (transaction: PartialTransaction) =>
      client.request(
        gql`
          mutation DeleteTransaction($transaction: TransactionInput!) {
            deleteTransaction(transaction: $transaction)
          }
        `,
        { transaction }
      ),
    {
      onMutate(transaction) {
        const [year, month] = transaction.date.split('-');
        const cacheKey = ['monthOverview', +month, +year];

        let snapshot: MonthOverview | undefined;

        try {
          cache.setQueryData<MonthOverview>(cacheKey, prevMonthOverview => {
            if (!prevMonthOverview) {
              throw new Error('No cache data available');
            }

            snapshot = { ...prevMonthOverview };

            prevMonthOverview.transactions = new Map(prevMonthOverview.transactions);
            prevMonthOverview.transactions.delete(transaction.id);

            return prevMonthOverview;
          });
        } catch (error) {
          console.error(`Optimistic update for delete transaction aborted: ${error.message}`);
        }

        if (snapshot) {
          return {
            cacheKey,
            snapshot,
          };
        }
      },
      onError(_error, _transaction, snapshot) {
        if (snapshot) {
          cache.setQueryData(snapshot.cacheKey, snapshot.snapshot);
        }
      },
    }
  );
}
