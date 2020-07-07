import React, { FC } from 'react';
import Placeholder from '../../Placeholder';
import styles from './styles.module.scss';

const Heading: FC = () => {
  return (
    <div className={styles.heading}>
      <span className={styles.monthLabel}>
        <Placeholder size={80} />
      </span>
      <Placeholder size={160} />
    </div>
  );
};

export default Heading;
