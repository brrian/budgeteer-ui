import React, { FC } from 'react';
import CategoriesPlaceholder from './CategoriesPlaceholder';
import HeadingPlaceholder from './HeadingPlaceholder';

const BudgetCategoriesPlaceholder: FC = () => {
  return (
    <>
      <HeadingPlaceholder />
      <CategoriesPlaceholder />
    </>
  );
};

export default BudgetCategoriesPlaceholder;
