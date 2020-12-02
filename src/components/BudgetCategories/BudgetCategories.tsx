import { isSameMonth, parse } from 'date-fns';
import React, { FC } from 'react';
import { useFetchGroupQuery } from '../../graphql';
import useFetchMonthOverviewQuery from '../../graphql/useFetchMonthOverviewQuery';
import Categories from './Categories';
import Heading from './Heading';

interface BudgetCategoriesProps {
  month: number;
  year: number;
}

const BudgetCategories: FC<BudgetCategoriesProps> = ({ month, year }) => {
  const { data: group } = useFetchGroupQuery();

  const {
    data: { budget },
  } = useFetchMonthOverviewQuery(month, year);

  const date = parse(`${month} ${year}`, 'M yyyy', new Date());

  const isCurrentMonth = isSameMonth(date, new Date());

  const categoriesTotal = budget.categories.reduce((accCount, { limit }) => accCount + limit, 0);
  const otherCategoryLimit = budget.total - categoriesTotal;

  return (
    <>
      <Heading
        date={date}
        runningBalance={isCurrentMonth ? group.runningBalance : undefined}
        spending={1000}
        total={budget.total}
      />
      <Categories
        categories={budget.categories}
        date={date}
        isCurrentMonth={isCurrentMonth}
        otherCategoryLimit={otherCategoryLimit}
      />
    </>
  );
};

export default BudgetCategories;
