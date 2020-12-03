import { getDate, getDaysInMonth } from 'date-fns';
import React, { FC } from 'react';
import styles from './Categories.module.scss';
import Category from './Category';
import { BudgetCategory } from './models';

interface CategoriesProps {
  categories: BudgetCategory[];
  date: Date;
  isCurrentMonth: boolean;
}

const Categories: FC<CategoriesProps> = ({ categories, date, isCurrentMonth }) => {
  const daysInMonth = getDaysInMonth(new Date());
  const percentPerDay = 100 / daysInMonth;

  const monthProgress = isCurrentMonth ? Math.round((getDate(date) / daysInMonth) * 100) : 100;

  return (
    <div className={styles.categories}>
      {categories.map(({ label, limit, spending }) => (
        <Category
          key={`${label}-${limit}`}
          label={label}
          limit={limit}
          monthProgress={monthProgress}
          percentPerDay={percentPerDay}
          spending={spending}
        />
      ))}
    </div>
  );
};

export default Categories;
