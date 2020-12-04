import React, { FC } from 'react';
import { Transaction as ITransaction } from '../../graphql/models';
import useFetchMonthOverviewQuery from '../../graphql/useFetchMonthOverviewQuery';
import useCategories from '../../util/hooks/useCategories';
import Transaction from './Transaction';

interface TransactionProps {
  month: number;
  onAction: (action: string, transaction: ITransaction, splitIndex?: number) => void;
  year: number;
}

const Transactions: FC<TransactionProps> = ({ month, onAction, year }) => {
  const {
    data: { transactions },
  } = useFetchMonthOverviewQuery(month, year);

  const categories = useCategories();

  return (
    <div>
      {Array.from(transactions.values()).map((transaction, index) => (
        <Transaction
          categories={categories}
          key={index}
          onAction={onAction}
          transaction={transaction}
        />
      ))}
    </div>
  );
};

export default Transactions;
