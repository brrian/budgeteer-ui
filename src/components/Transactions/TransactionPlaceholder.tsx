import { random } from 'lodash-es';
import React, { FC, useRef } from 'react';
import Placeholder from '../Placeholder';
import styles from './Transaction.module.scss';

const TransactionPlaceholder: FC = () => {
  const sizes = useRef({
    amount: [45, 54, 72][random(2)],
    category: random(2, 4) * 40,
    description: random(2, 4) * 40,
  });

  return (
    <div className={styles.transaction}>
      <div className={styles.heading}>
        <div className={styles.date}>
          <Placeholder size={36} />
        </div>
        <div className={styles.description}>
          <Placeholder size={sizes.current.description} />
        </div>
      </div>
      <div className={styles.item}>
        <div>
          <Placeholder size={sizes.current.category} />
        </div>
        <span className={styles.amount}>
          <Placeholder size={sizes.current.amount} />
        </span>
      </div>
    </div>
  );
};

export default TransactionPlaceholder;