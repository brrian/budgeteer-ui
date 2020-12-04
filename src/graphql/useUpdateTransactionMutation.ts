import { gql } from 'graphql-request';
import { MutationResultPair, useMutation, useQueryCache } from 'react-query';
import useClient from '../util/hooks/useClient';
import { MonthOverview, Transaction } from './models';

type PartialTransaction = Partial<Transaction> & Pick<Transaction, 'id' | 'date'>;

interface UpdateTransactionSnapshot {
  cacheKey: unknown[];
  snapshot: MonthOverview;
}

export default function useUpdateTransactionMutation(): MutationResultPair<
  Transaction,
  unknown,
  PartialTransaction,
  UpdateTransactionSnapshot | undefined
> {
  const cache = useQueryCache();

  const client = useClient();

  return useMutation(
    (transaction: PartialTransaction) =>
      client.request(
        gql`
          mutation UpdateTransaction($transaction: TransactionInput!) {
            updateTransaction(transaction: $transaction) {
              __typename
            }
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

            const oldTransaction = prevMonthOverview.transactions.get(transaction.id);

            if (oldTransaction) {
              prevMonthOverview.transactions = new Map(prevMonthOverview.transactions);
              prevMonthOverview.transactions.set(transaction.id, {
                ...oldTransaction,
                ...transaction,
              });
            }

            return prevMonthOverview;
          });
        } catch (error) {
          console.error(`Optimistic update for transaction aborted: ${error.message}`);
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
