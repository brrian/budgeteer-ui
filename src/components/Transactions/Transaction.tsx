import cc from 'classcat';
import React, { FC, useMemo } from 'react';
import { Transaction as ITransaction } from '../../util/helpers/api/models';
import styles from './Transaction.module.scss';
import TransactionItem from './TransactionItem';

interface TransactionProps {
  onAction: (action: string, splitIndex?: number) => void;
  transaction: ITransaction;
}

const Transaction: FC<TransactionProps> = ({ onAction, transaction }) => {
  const { date, description, disabled, splits } = transaction;

  const isFullyDisabled = useMemo(() => {
    return disabled && splits.every(split => split.disabled);
  }, [disabled, splits]);

  const handleSwipeAction = (action: string, index: number) => {
    const splitIndex = index !== 0 ? index - 1 : undefined;

    onAction(action, splitIndex);
  };

  const combinedTransactions = [transaction, ...splits];

  return (
    <div
      className={cc({
        [styles.transaction]: true,
        [styles.disabled]: isFullyDisabled,
      })}
    >
      <div className={styles.heading}>
        <div className={styles.date}>{date.substring(5).replace(/0/g, '').replace('-', '/')}</div>
        <div className={styles.description}>{description}</div>
      </div>
      {combinedTransactions.map((item, index) => (
        <TransactionItem
          {...item}
          key={index}
          onAction={action => handleSwipeAction(action, index)}
        />
      ))}
    </div>
  );
};

export default Transaction;
