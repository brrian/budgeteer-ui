import cc from 'classcat';
import React, { FC, useEffect, useMemo, useState } from 'react';
import { animated, useSpring } from 'react-spring';
import { useDrag } from 'react-use-gesture';
import useTranslation from '../../../util/hooks/useTranslation';
import { Transaction as ITransaction } from '../models';
import actions, { Action } from '../util/actions';
import categories from './mockCategories';
import styles from './styles.module.scss';

interface TransactionProps extends ITransaction {
  mode: 'hover' | 'swipe';
  onAction: (action: string) => void;
}

const Transaction: FC<TransactionProps> = ({
  amount,
  categoryId,
  date,
  description,
  disabled,
  mode,
  note,
  onAction,
  splits,
}) => {
  const { t } = useTranslation();

  const isFullyDisabled = useMemo(() => {
    return disabled && splits.every(split => split.disabled);
  }, [disabled, splits]);

  const [props, set] = useSpring(() => ({ left: 0 }));

  const [currentAction, setCurrentAction] = useState<Action | undefined>();

  useEffect(() => {
    if (currentAction) {
      navigator.vibrate?.(16);
    }
  }, [currentAction]);

  const bind = useDrag(
    ({ down, last, movement: [mx] }) => {
      const action = actions.find(({ breakpoints: { min, max } }) => mx >= min && mx < max);

      if (action !== currentAction) {
        setCurrentAction(action);
      }

      if (action && last) {
        onAction(action.type);
      }

      set({
        left: last ? 0 : mx,
        immediate: down,
      });
    },
    { axis: 'x' }
  );

  return (
    <div className={styles.transactionContainer}>
      <animated.div
        {...(mode === 'swipe' ? bind() : undefined)}
        className={cc({
          [styles.transaction]: true,
          [styles.disabled]: isFullyDisabled,
        })}
        style={props}
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
      </animated.div>
      {mode === 'swipe' && (
        <div
          className={styles.swipeActions}
          data-color={currentAction?.color}
          data-orientation={currentAction?.orientation}
        >
          {!!currentAction?.type && t(currentAction.type)}
        </div>
      )}
    </div>
  );
};

export default Transaction;
