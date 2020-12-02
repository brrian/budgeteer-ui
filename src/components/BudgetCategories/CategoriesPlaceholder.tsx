import React, { FC } from 'react';
import CategoryPlaceholder from './CategoryPlaceholder';
import styles from './Categories.module.scss';

const CategoriesPlaceholder: FC = () => {
  return (
    <div className={styles.categories}>
      {[...Array(4)].map((_item, index) => (
        <CategoryPlaceholder key={index} />
      ))}
    </div>
  );
};

export default CategoriesPlaceholder;
