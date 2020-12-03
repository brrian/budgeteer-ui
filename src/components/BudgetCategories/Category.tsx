import React, { FC } from 'react';
import styles from './Category.module.scss';

interface CategoryProps {
  label: string;
  limit: number;
  monthProgress: number;
  percentPerDay: number;
  spending: number;
}

const Category: FC<CategoryProps> = ({ label, limit, monthProgress, percentPerDay, spending }) => {
  const progress = Math.round((spending / limit) * 100);

  const progressDelta = progress - monthProgress;

  const color =
    progress > 0 && progressDelta <= 0
      ? 'under'
      : progress > 0 && progressDelta <= 7
      ? 'close'
      : 'over';

  const spendingDelta = Math.ceil((monthProgress - progress) / percentPerDay);
  const spendingDeltaLabel =
    spendingDelta > 0 ? `+${spendingDelta}` : `${spendingDelta}`.replace('Infinity', '∞');

  return (
    <div className={styles.category}>
      <div className={styles.progressContainer}>
        <span
          className={styles.progressBar}
          data-color={color}
          style={{ width: `calc(${progress}% + 1px)` }}
        />
        {monthProgress < 100 && (
          <span className={styles.dateMarker} style={{ left: `${monthProgress}%` }} />
        )}
      </div>
      <div className={styles.labels}>
        <span>
          {label}: ${Math.round(spending).toLocaleString()}
          {monthProgress < 100 && ` (${spendingDeltaLabel})`}
        </span>
        <span>${limit.toLocaleString()}</span>
      </div>
    </div>
  );
};

export default Category;
