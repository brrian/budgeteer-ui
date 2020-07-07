import React, { FC } from 'react';
import styles from './styles.module.scss';

const Heading: FC = () => {
  return (
    <div className={styles.heading}>
      <span className={styles.monthLabel}>May 2020</span>
      <span>$1,024 of 1,048 (-127)</span>
    </div>
  );
};

export default Heading;
