import cc from 'classcat';
import React, { FC, useState } from 'react';
import { Categories } from '../../graphql/models';
import useTranslation from '../../util/hooks/useTranslation';
import Swipeable from '../Swipeable';
import PopUpActions from './PopUpActions';
import styles from './TransactionItem.module.scss';
import useTransactionActions from './util/useTransactionActions';

interface TransactionItemProps {
  amount: number;
  categories: Categories;
  categoryId: string;
  className?: string;
  disabled: boolean;
  note: string | null;
  onAction: (action: string) => void;
}

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

  const actions = useTransactionActions(disabled);

  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <Swipeable actions={actions} onAction={onAction}>
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
          {!isTouchDevice && isHovered && <PopUpActions actions={actions} onAction={onAction} />}
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
