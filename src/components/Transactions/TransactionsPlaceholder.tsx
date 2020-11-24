import { random } from 'lodash-es';
import React, { FC } from 'react';
import Placeholder from '../Placeholder';
import styles from './Transaction.module.scss';
import TransactionItemPlaceholder from './TransactionItemPlaceholder';

const TransactionsPlaceholder: FC = () => {
  return (
    <>
      {[...Array(12)].map((_item, index) => (
        <div className={styles.transaction} key={index}>
          <div className={styles.heading}>
            <div className={styles.date}>
              <Placeholder size={36} />
            </div>
            <div className={styles.description}>
              <Placeholder size={random(2, 4) * 40} />
            </div>
          </div>
          <TransactionItemPlaceholder />
        </div>
      ))}
    </>
  );
};

export default TransactionsPlaceholder;
