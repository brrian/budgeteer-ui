import { getDate, getDaysInMonth } from 'date-fns';
import React, { FC } from 'react';
import useCategories from '../../util/hooks/useCategories';
import useTranslation from '../../util/hooks/useTranslation';
import styles from './Categories.module.scss';
import Category from './Category';
import { Category as ICategory } from './models';

interface CategoriesProps {
  categories: ICategory[];
  date: Date;
  isCurrentMonth: boolean;
  otherCategoryLimit: number;
}

const Categories: FC<CategoriesProps> = ({
  categories,
  date,
  isCurrentMonth,
  otherCategoryLimit,
}) => {
  const { t } = useTranslation();

  const categoryMap = useCategories();

  const daysInMonth = getDaysInMonth(new Date());
  const percentPerDay = 100 / daysInMonth;

  const monthProgress = isCurrentMonth ? Math.round((getDate(date) / daysInMonth) * 100) : 100;

  return (
    <div className={styles.categories}>
      {categories.map(({ categoryId, limit }) => (
        <Category
          key={categoryId}
          label={categoryMap.get(categoryId) ?? t('unknownCategory')}
          limit={limit}
          monthProgress={monthProgress}
          percentPerDay={percentPerDay}
          spending={5}
        />
      ))}
      {otherCategoryLimit > 0 && (
        <Category
          label={t('other')}
          limit={otherCategoryLimit}
          monthProgress={monthProgress}
          percentPerDay={percentPerDay}
          spending={235}
        />
      )}
    </div>
  );
};

export default Categories;
