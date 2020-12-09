import React, { FC } from 'react';
import { animated, useSpring } from 'react-spring';
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

  const spendingSpring = useSpring({
    spending,
    width: `${progress}%`,
  });

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
        <animated.span
          className={styles.progressBar}
          data-color={color}
          style={{ width: spendingSpring.width }}
        />
        {monthProgress < 100 && (
          <span className={styles.dateMarker} style={{ left: `${monthProgress}%` }} />
        )}
      </div>
      <div className={styles.labels}>
        <span>
          <animated.span>
            {spendingSpring.spending.interpolate(
              value => `${label}: $${Math.round(value).toLocaleString()}`
            )}
          </animated.span>
          {monthProgress < 100 && ` (${spendingDeltaLabel})`}
        </span>
        <span>${limit.toLocaleString()}</span>
      </div>
    </div>
  );
};

export default Category;
