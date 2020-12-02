import { format } from 'date-fns';
import React, { FC } from 'react';
import styles from './Heading.module.scss';

interface HeadingProps {
  date: Date;
  runningBalance?: number;
  spending: number;
  total: number;
}

const Heading: FC<HeadingProps> = ({ date, runningBalance, spending, total }) => {
  return (
    <div className={styles.heading}>
      <span className={styles.monthLabel}>{format(date, 'MMM yyyy')}</span>
      <span>
        ${spending.toLocaleString()} of {total.toLocaleString()}
        {runningBalance !== undefined && ` (${runningBalance})`}
      </span>
    </div>
  );
};

export default Heading;
