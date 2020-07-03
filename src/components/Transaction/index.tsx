import cc from 'classcat';
import React, { FC, useMemo } from 'react';
import categories from './mockCategories';
import styles from './styles.module.scss';

interface Split {
  amount: number;
  categoryId: number;
  disabled: boolean;
  note: string | null;
}

interface TransactionProps {
  amount: number;
  categoryId: number;
  date: string;
  description: string;
  disabled: boolean;
  note: string | null;
  splits: Split[];
}

const Transaction: FC<TransactionProps> = ({
  amount,
  categoryId,
  date,
  description,
  disabled,
  note,
  splits,
}) => {
  const isFullyDisabled = useMemo(() => {
    return disabled && splits.every(split => split.disabled);
  }, [disabled, splits]);

  return (
    <div
      className={cc({
        [styles.transaction]: true,
        [styles.disabled]: isFullyDisabled,
      })}
    >
      <div className={styles.date}>{date.substring(5).replace(/0/g, '').replace('-', '/')}</div>
      <div className={styles.content}>
        <div className={styles.description}>{description}</div>
        <div
          className={cc({
            [styles.details]: true,
            [styles.disabled]: disabled,
          })}
        >
          <div>
            {categories[categoryId]}
            {note && ` *${note}*`}
          </div>
          <span className={styles.amount}>${amount.toFixed(2)}</span>
        </div>
        {splits.map((split, index) => (
          <div
            className={cc({
              [styles.details]: true,
              [styles.disabled]: split.disabled,
            })}
            key={index}
          >
            <div>
              {categories[split.categoryId]}
              {split.note && ` *${split.note}*`}
            </div>
            <span>${split.amount.toFixed(2)}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Transaction;
