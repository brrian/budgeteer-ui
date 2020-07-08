import { random } from 'lodash-es';
import React, { FC } from 'react';
import Placeholder from '../../Placeholder';
import styles from './styles.module.scss';

const TransactionPlaceholder: FC = () => {
  return (
    <div className={styles.transactionContainer}>
      <div className={styles.transaction}>
        <div className={styles.date}>
          <Placeholder size={36} />
        </div>
        <div className={styles.content}>
          <div className={styles.description}>
            <Placeholder size={random(2, 4) * 40} />
          </div>
          <div className={styles.details}>
            <div>
              <Placeholder size={random(2, 4) * 40} />
            </div>
            <span className={styles.amount}>
              <Placeholder size={[45, 54, 72][random(2)]} />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionPlaceholder;
