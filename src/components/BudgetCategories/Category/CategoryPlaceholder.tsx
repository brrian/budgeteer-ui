import cc from 'classcat';
import { random } from 'lodash-es';
import React, { FC } from 'react';
import Placeholder from '../../Placeholder';
import styles from './styles.module.scss';

const CategoryPlaceholder: FC = () => {
  return (
    <div className={styles.category}>
      <div className={cc([styles.progressContainer, styles.isLoading])} />
      <div className={styles.labels}>
        <Placeholder size={random(2, 4) * 40} />
        <Placeholder size={36} />
      </div>
    </div>
  );
};

export default CategoryPlaceholder;
