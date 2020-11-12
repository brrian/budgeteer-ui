import React, { FC } from 'react';
import { Transaction as ITransaction } from '../../util/helpers/api/models';
import Transaction from './Transaction';
import TransactionPlaceholder from './TransactionPlaceholder';

interface TransactionProps {
  onAction: (action: string, transactionIndex: number, splitIndex?: number) => void;
  transactions?: ITransaction[];
}

const Transactions: FC<TransactionProps> = ({ onAction, transactions }) => {
  return (
    <div>
      {transactions
        ? transactions.map((transaction, index) => (
            <Transaction
              key={index}
              onAction={(action, splitIndex) => onAction(action, index, splitIndex)}
              transaction={transaction}
            />
          ))
        : [...Array(12)].map((_item, index) => <TransactionPlaceholder key={index} />)}
    </div>
  );
};

export default Transactions;
