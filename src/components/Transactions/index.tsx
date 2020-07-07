import React, { FC } from 'react';
import { Transaction as ITransaction } from './models';
import Transaction from './Transaction';

interface TransactionProps {
  transactions: ITransaction[];
}

const Transactions: FC<TransactionProps> = ({ transactions }) => {
  const handleTransactionAction = (action: string) => {
    window.alert(`Do action: ${action}`);
  };

  const isTouchDevice =
    !!window.ontouchstart ||
    !!window.navigator.maxTouchPoints ||
    !!window.navigator.msMaxTouchPoints;

  return (
    <div>
      {transactions.map((transaction, index) => (
        <Transaction
          {...transaction}
          key={index}
          mode={isTouchDevice ? 'swipe' : 'hover'}
          onAction={handleTransactionAction}
        />
      ))}
    </div>
  );
};

export default Transactions;
