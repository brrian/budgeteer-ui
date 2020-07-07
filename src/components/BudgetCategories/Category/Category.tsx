import React, { FC } from 'react';
import styles from './styles.module.scss';

const Category: FC = () => {
  return (
    <div className={styles.category}>
      <div className={styles.progressContainer}>
        <span className={styles.progressBar} data-color="under" style={{ width: '50%' }} />
        <span className={styles.dateMarker} style={{ left: '67%' }} />
      </div>
      <div className={styles.labels}>
        <span>Groceries: $248 (+7)</span>
        <span>$450</span>
      </div>
    </div>
  );
};

export default Category;
