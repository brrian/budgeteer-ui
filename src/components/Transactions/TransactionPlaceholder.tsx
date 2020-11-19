import { random } from 'lodash-es';
import React, { FC, useRef } from 'react';
import Placeholder from '../Placeholder';
import styles from './Transaction.module.scss';
import TransactionItemPlaceholder from './TransactionItemPlaceholder';

const TransactionPlaceholder: FC = () => {
  const descriptionSize = useRef(random(2, 4) * 40);

  return (
    <div className={styles.transaction}>
      <div className={styles.heading}>
        <div className={styles.date}>
          <Placeholder size={36} />
        </div>
        <div className={styles.description}>
          <Placeholder size={descriptionSize.current} />
        </div>
      </div>
      <TransactionItemPlaceholder />
    </div>
  );
};

export default TransactionPlaceholder;
