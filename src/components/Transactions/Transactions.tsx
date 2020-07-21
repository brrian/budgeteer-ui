import React, { FC } from 'react';
import { Transaction as ITransaction } from '../../util/helpers/api/models';
import Transaction, { TransactionPlaceholder } from './Transaction';

interface TransactionProps {
  onAction: (action: string, index: number) => void;
  transactions?: ITransaction[];
}

const Transactions: FC<TransactionProps> = ({ transactions, onAction }) => {
  const isTouchDevice =
    !!window.ontouchstart ||
    !!window.navigator.maxTouchPoints ||
    !!window.navigator.msMaxTouchPoints;

  return (
    <div>
      {transactions
        ? transactions.map((transaction, index) => (
            <Transaction
              {...transaction}
              key={index}
              mode={isTouchDevice ? 'swipe' : 'hover'}
              onAction={action => onAction(action, index)}
            />
          ))
        : [...Array(12)].map((item, index) => <TransactionPlaceholder key={index} />)}
    </div>
  );
};

export default Transactions;
