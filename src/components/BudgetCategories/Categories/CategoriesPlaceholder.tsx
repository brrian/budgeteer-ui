import React, { FC } from 'react';
import { CategoryPlaceholder } from '../Category';
import styles from './styles.module.scss';

const CategoriesPlaceholder: FC = () => {
  return (
    <div className={styles.categories}>
      {[...Array(4)].map((item, index) => (
        <CategoryPlaceholder key={index} />
      ))}
    </div>
  );
};

export default CategoriesPlaceholder;
