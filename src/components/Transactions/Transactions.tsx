import React, { FC } from 'react';
import { Transaction as ITransaction } from '../../graphql/models';
import useCategories from '../../util/hooks/useCategories';
import transactions from './mockTransactions';
import Transaction from './Transaction';

interface TransactionProps {
  onAction: (action: string, transaction: ITransaction, splitIndex?: number) => void;
}

const Transactions: FC<TransactionProps> = ({ onAction }) => {
  const categories = useCategories();

  return (
    <div>
      {transactions.map((transaction, index) => (
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
