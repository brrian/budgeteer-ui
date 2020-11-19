import cc from 'classcat';
import React, { FC, useState } from 'react';
import { useUserState } from '../../util/contexts/UserContext';
import Swipeable from '../Swipeable';
import PopUpActions from './PopUpActions';
import styles from './TransactionItem.module.scss';

interface TransactionItemProps {
  amount: number;
  categoryId: string;
  className?: string;
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
  categoryId,
  className,
  note,
  onAction,
}) => {
  const { categories } = useUserState();

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
          className={cc([styles.transactionItem, className])}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {!isTouchDevice && isHovered && <PopUpActions actions={ACTIONS} onAction={onAction} />}
          <div>
            {categories.get(categoryId)?.label}
            <div className={styles.note}>{note && ` *${note}*`}</div>
          </div>
          <span className={styles.amount}>${amount.toFixed(2)}</span>
        </div>
      )}
    </Swipeable>
  );
};

export default TransactionItem;
