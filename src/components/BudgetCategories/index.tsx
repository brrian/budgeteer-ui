import React, { FC } from 'react';
import styles from './styles.module.scss';

const BudgetCategories: FC = () => {
  return (
    <>
      <div className={styles.heading}>
        <span className={styles.monthLabel}>May 2020</span>
        <span>$1,024 of 1,048 (-127)</span>
      </div>
      <div className={styles.categories}>
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
        <div className={styles.category}>
          <div className={styles.progressContainer}>
            <span className={styles.progressBar} data-color="close" style={{ width: '69%' }} />
            <span className={styles.dateMarker} style={{ left: '67%' }} />
          </div>
          <div className={styles.labels}>
            <span>Gasoline: $75 (-1)</span>
            <span>$90</span>
          </div>
        </div>
        <div className={styles.category}>
          <div className={styles.progressContainer}>
            <span className={styles.progressBar} data-color="over" style={{ width: '75%' }} />
            <span className={styles.dateMarker} style={{ left: '67%' }} />
          </div>
          <div className={styles.labels}>
            <span>Restaurants: $320 (+12)</span>
            <span>$250</span>
          </div>
        </div>
        <div className={styles.category}>
          <div className={styles.progressContainer}>
            <span className={styles.progressBar} data-color="over" style={{ width: '120%' }} />
            <span className={styles.dateMarker} style={{ left: '67%' }} />
          </div>
          <div className={styles.labels}>
            <span>Other: $512 (-20)</span>
            <span>$450</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default BudgetCategories;
