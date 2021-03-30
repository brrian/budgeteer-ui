import { format } from 'date-fns';
import React, { FC } from 'react';
import { animated, useSpring } from 'react-spring';
import styles from './Heading.module.scss';

interface HeadingProps {
  budgetTotal: number;
  date: Date;
  runningBalance?: number;
  totalSpending: number;
}

const Heading: FC<HeadingProps> = ({ budgetTotal, date, runningBalance, totalSpending }) => {
  const spendingSpring = useSpring<{ totalSpending: number }>({ totalSpending });

  let targetSpending = budgetTotal;
  if (runningBalance) {
    targetSpending += runningBalance;
  }

  return (
    <div className={styles.heading}>
      <span className={styles.monthLabel}>{format(date, 'MMM yyyy')}</span>
      <span>
        <animated.span>
          {spendingSpring.totalSpending.interpolate(
            value => `$${Math.round(value).toLocaleString()} of ${targetSpending.toLocaleString()}`
          )}
        </animated.span>
        {runningBalance !== undefined && ` (${Math.round(runningBalance)})`}
      </span>
    </div>
  );
};

export default Heading;
