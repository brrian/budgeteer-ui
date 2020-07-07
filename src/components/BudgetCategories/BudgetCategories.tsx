import React, { FC } from 'react';
import Categories, { CategoriesPlaceholder } from './Categories';
import Heading, { HeadingPlaceholder } from './Heading';
import { Category } from './models';

interface BudgetCategoriesProps {
  categories?: Category[];
}

const BudgetCategories: FC<BudgetCategoriesProps> = ({ categories }) => {
  return categories ? (
    <>
      <Heading />
      <Categories categories={categories} />
    </>
  ) : (
    <>
      <HeadingPlaceholder />
      <CategoriesPlaceholder />
    </>
  );
};

export default BudgetCategories;
