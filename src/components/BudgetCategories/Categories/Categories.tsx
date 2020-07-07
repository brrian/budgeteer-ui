import React, { FC } from 'react';
import Category from '../Category';
import { Category as ICategory } from '../models';
import styles from './styles.module.scss';

interface CategoriesProps {
  categories: ICategory[];
}

const Categories: FC<CategoriesProps> = () => {
  return (
    <div className={styles.categories}>
      <Category />
      <Category />
      <Category />
      <Category />
    </div>
  );
};

export default Categories;
