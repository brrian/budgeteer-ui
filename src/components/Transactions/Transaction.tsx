import cc from 'classcat';
import React, { FC, useMemo } from 'react';
import { useUserState } from '../../util/contexts/UserContext';
import { Transaction as ITransaction } from '../../util/helpers/api/models';
import useTranslation from '../../util/hooks/useTranslation';
import Swipeable from '../Swipeable';
import styles from './Transaction.module.scss';

interface TransactionProps {
  onAction: (action: string, splitIndex?: number) => void;
  transaction: ITransaction;
}

const Transaction: FC<TransactionProps> = ({ onAction, transaction }) => {
  const { date, description, disabled, splits } = transaction;

  const { categories } = useUserState();

  const { t } = useTranslation();

  const isFullyDisabled = useMemo(() => {
    return disabled && splits.every(split => split.disabled);
  }, [disabled, splits]);

  const actions = useMemo(
    () => [
      {
        breakpoints: {
          min: 80,
          max: 150,
        },
        color: 'blue',
        id: 'split',
        label: t('split'),
        orientation: 'left',
      },
      {
        breakpoints: {
          min: 150,
          max: Infinity,
        },
        color: 'green',
        id: 'addNote',
        label: t('addNote'),
        orientation: 'left',
      },
      {
        breakpoints: {
          min: -150,
          max: -80,
        },
        color: 'purple',
        id: 'disable',
        label: t('disable'),
        orientation: 'right',
      },
      {
        breakpoints: {
          min: -Infinity,
          max: -150,
        },
        color: 'red',
        id: 'delete',
        label: t('delete'),
        orientation: 'right',
      },
    ],
    [t]
  );

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
        <Swipeable
          actions={actions}
          key={index}
          onAction={action => handleSwipeAction(action, index)}
        >
          <div
            className={cc({
              [styles.item]: true,
              [styles.disabled]: disabled,
            })}
          >
            <div>
              {categories.get(item.categoryId)?.label}
              <div className={styles.note}>{item.note && ` *${item.note}*`}</div>
            </div>
            <span className={styles.amount}>${item.amount.toFixed(2)}</span>
          </div>
        </Swipeable>
      ))}
    </div>
  );
};

export default Transaction;
