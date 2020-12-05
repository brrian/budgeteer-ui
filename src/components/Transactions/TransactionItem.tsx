import cc from 'classcat';
import React, { FC, useState } from 'react';
import { Categories } from '../../graphql/models';
import useTranslation from '../../util/hooks/useTranslation';
import Swipeable from '../Swipeable';
import PopUpActions from './PopUpActions';
import styles from './TransactionItem.module.scss';

interface TransactionItemProps {
  amount: number;
  categories: Categories;
  categoryId: string;
  className?: string;
  disabled: boolean;
  note: string | null;
  onAction: (action: string) => void;
}

const ACTIONS = [
  {
    breakpoints: {
      min: 80,
      max: 150,
    },
    color: 'blue',
    id: 'split',
    labelKey: 'split',
    orientation: 'left',
  },
  {
    breakpoints: {
      min: 150,
      max: Infinity,
    },
    color: 'green',
    id: 'edit',
    labelKey: 'edit',
    orientation: 'left',
  },
  {
    breakpoints: {
      min: -150,
      max: -80,
    },
    color: 'purple',
    id: 'disable',
    labelKey: 'disable',
    orientation: 'right',
  },
  {
    breakpoints: {
      min: -Infinity,
      max: -150,
    },
    color: 'red',
    id: 'delete',
    labelKey: 'delete',
    orientation: 'right',
  },
];

const TransactionItem: FC<TransactionItemProps> = ({
  amount,
  categories,
  categoryId,
  className,
  disabled,
  note,
  onAction,
}) => {
  const { t } = useTranslation();

  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <Swipeable actions={ACTIONS} onAction={onAction}>
      {isTouchDevice => (
        <div
          className={cc([
            className,
            {
              [styles.transactionItem]: true,
              [styles.disabled]: disabled,
            },
          ])}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {!isTouchDevice && isHovered && <PopUpActions actions={ACTIONS} onAction={onAction} />}
          <div>
            {categories.get(categoryId) ?? t('unknownCategory')}
            <div className={styles.note}>{note && ` *${note}*`}</div>
          </div>
          <span className={styles.amount}>${amount.toFixed(2)}</span>
        </div>
      )}
    </Swipeable>
  );
};

export default TransactionItem;
