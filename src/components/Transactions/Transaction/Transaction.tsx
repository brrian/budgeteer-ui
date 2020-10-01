import cc from 'classcat';
import React, { FC, useMemo } from 'react';
import { useUserState } from '../../../util/contexts/UserContext';
import { Transaction as ITransaction } from '../../../util/helpers/api/models';
import styles from './styles.module.scss';

interface TransactionProps {
  transaction: ITransaction;
  onSelect: () => void;
}

const Transaction: FC<TransactionProps> = ({ transaction, onSelect }) => {
  const { amount, categoryId, date, description, disabled, note, splits } = transaction;

  const { categories } = useUserState();

  const isFullyDisabled = useMemo(() => {
    return disabled && splits.every(split => split.disabled);
  }, [disabled, splits]);

  return (
    <div
      className={cc({
        [styles.transaction]: true,
        [styles.disabled]: isFullyDisabled,
      })}
      onClick={onSelect}
      role="button"
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
            {categories.get(categoryId)?.label}
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
              {categories.get(split.categoryId)?.label}
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
