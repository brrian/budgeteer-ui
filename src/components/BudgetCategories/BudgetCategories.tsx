import { isSameMonth, parse } from 'date-fns';
import React, { FC, useEffect } from 'react';
import { useFetchGroupQuery } from '../../graphql';
import useFetchMonthOverviewQuery from '../../graphql/useFetchMonthOverviewQuery';
import Categories from './Categories';
import Heading from './Heading';
import useBudgetCategories from './util/useBudgetCategories';

interface BudgetCategoriesProps {
  month: number;
  setCategoriesCount: (count: number) => void;
  year: number;
}

const BudgetCategories: FC<BudgetCategoriesProps> = ({ month, setCategoriesCount, year }) => {
  const { data: group } = useFetchGroupQuery();

  const {
    data: { budget, transactions },
  } = useFetchMonthOverviewQuery(month, year);

  const categories = useBudgetCategories(budget, transactions);

  useEffect(() => {
    setCategoriesCount(categories.length);
  }, [categories]);

  const totalSpending = categories.reduce((accTotal, { spending }) => accTotal + spending, 0);

  const date = parse(`${month} ${year}`, 'M yyyy', new Date());
  const isCurrentMonth = isSameMonth(date, new Date());

  return (
    <>
      <Heading
        budgetTotal={budget.total}
        date={date}
        runningBalance={isCurrentMonth ? group.runningBalance : undefined}
        totalSpending={totalSpending}
      />
      <Categories categories={categories} isCurrentMonth={isCurrentMonth} />
    </>
  );
};

export default BudgetCategories;
