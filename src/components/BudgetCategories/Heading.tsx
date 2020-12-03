import { format } from 'date-fns';
import React, { FC } from 'react';
import styles from './Heading.module.scss';

interface HeadingProps {
  budgetTotal: number;
  date: Date;
  runningBalance?: number;
  totalSpending: number;
}

const Heading: FC<HeadingProps> = ({ budgetTotal, date, runningBalance, totalSpending }) => {
  let targetSpending = budgetTotal;
  if (budgetTotal) {
    targetSpending += budgetTotal;
  }

  return (
    <div className={styles.heading}>
      <span className={styles.monthLabel}>{format(date, 'MMM yyyy')}</span>
      <span>
        ${Math.round(totalSpending).toLocaleString()} of {targetSpending.toLocaleString()}
        {runningBalance !== undefined && ` (${runningBalance})`}
      </span>
    </div>
  );
};

export default Heading;
