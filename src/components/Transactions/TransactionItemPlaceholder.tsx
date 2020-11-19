import { random } from 'lodash-es';
import React, { FC, useRef } from 'react';
import Placeholder from '../Placeholder';
import styles from './TransactionItem.module.scss';

const TransactionItemPlaceholder: FC = () => {
  const sizes = useRef({
    amount: [45, 54, 72][random(2)],
    category: random(2, 4) * 40,
  });

  return (
    <div className={styles.transactionItem}>
      <div>
        <Placeholder size={sizes.current.category} />
      </div>
      <span className={styles.amount}>
        <Placeholder size={sizes.current.amount} />
      </span>
    </div>
  );
};

export default TransactionItemPlaceholder;
