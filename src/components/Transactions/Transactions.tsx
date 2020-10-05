import React, { FC, useEffect } from 'react';
import { Transaction as ITransaction } from '../../util/helpers/api/models';
import Transaction, { TransactionPlaceholder } from './Transaction';

interface TransactionProps {
  transactions?: ITransaction[];
  onSelect: (index: number) => void;
}

const Transactions: FC<TransactionProps> = ({ transactions, onSelect }) => {
  useEffect(() => {
    onSelect(4);
  }, []);

  return (
    <div>
      {transactions
        ? transactions.map((transaction, index) => (
            <Transaction transaction={transaction} key={index} onSelect={() => onSelect(index)} />
          ))
        : [...Array(12)].map((item, index) => <TransactionPlaceholder key={index} />)}
    </div>
  );
};

export default Transactions;
