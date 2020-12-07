import cc from 'classcat';
import React, { FC, memo, useMemo } from 'react';
import { Categories, Transaction as ITransaction } from '../../graphql/models';
import styles from './Transaction.module.scss';
import TransactionItem from './TransactionItem';

interface TransactionProps {
  categories: Categories;
  onAction: (action: string, transaction: ITransaction, splitIndex?: number) => void;
  transaction: ITransaction;
}

const Transaction: FC<TransactionProps> = ({ categories, onAction, transaction }) => {
  const { date, description, disabled, splits } = transaction;

  const isFullyDisabled = useMemo(() => {
    return disabled && splits.every(split => split.disabled);
  }, [disabled, splits]);

  const handleSwipeAction = (action: string, index: number) => {
    const splitIndex = index !== 0 ? index - 1 : undefined;

    onAction(action, transaction, splitIndex);
  };

  const combinedTransactions = [transaction, ...splits];

  return (
    <div className={styles.transaction}>
      <div
        className={cc({
          [styles.heading]: true,
          [styles.disabled]: isFullyDisabled,
        })}
      >
        <div className={styles.date}>{date.substring(5).replace('-0', '-').replace('-', '/')}</div>
        <div className={styles.description}>{description}</div>
      </div>
      {combinedTransactions.map((item, index) => (
        <TransactionItem
          {...item}
          categories={categories}
          key={`${item.amount}-${item.categoryId}-${index}`}
          onAction={action => handleSwipeAction(action, index)}
        />
      ))}
    </div>
  );
};

export default memo(Transaction);
