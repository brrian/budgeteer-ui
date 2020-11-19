import cc from 'classcat';
import React, { FC, ReactNode, useEffect, useState } from 'react';
import { animated, useSpring } from 'react-spring';
import { useDrag } from 'react-use-gesture';
import useTranslation from '../../util/hooks/useTranslation';
import styles from './Swipeable.module.scss';

export interface Action {
  breakpoints: {
    min: number;
    max: number;
  };
  color: string;
  id: string;
  labelKey: string;
  orientation: string;
}

interface SwipeableProps {
  actions: Action[];
  children?: (isTouchDevice: boolean) => ReactNode;
  className?: string;
  onAction: (action: string) => void;
}

const Swipeable: FC<SwipeableProps> = ({ actions, children, className, onAction }) => {
  const { t } = useTranslation();

  const [props, set] = useSpring(() => ({ left: 0 }));

  const [isSwiping, setIsSwiping] = useState(false);

  const [currentAction, setCurrentAction] = useState<Action | undefined>();

  useEffect(() => {
    if (currentAction) {
      navigator.vibrate?.(16);
    }
  }, [currentAction]);

  const bind = useDrag(
    ({ down, first, last, movement: [mx] }) => {
      const action = actions.find(({ breakpoints: { min, max } }) => mx >= min && mx < max);

      if (first) {
        setIsSwiping(true);
      }

      if (action !== currentAction) {
        setCurrentAction(action);
      }

      if (last) {
        setIsSwiping(false);

        if (action) {
          onAction(action.id);
        }
      }

      set({
        left: last ? 0 : mx,
        immediate: down,
      });
    },
    { axis: 'x' }
  );

  const isTouchDevice =
    !!window.ontouchstart ||
    !!window.navigator.maxTouchPoints ||
    !!window.navigator.msMaxTouchPoints;

  return (
    <div
      className={cc({
        [styles.swipeContainer]: isTouchDevice,
      })}
    >
      <animated.div
        {...(isTouchDevice ? bind() : undefined)}
        className={cc([
          className,
          {
            [styles.swipeItem]: true,
            [styles.isSwiping]: isSwiping,
          },
        ])}
        style={props}
      >
        {children?.(isTouchDevice)}
      </animated.div>
      {isTouchDevice && (
        <div
          className={styles.swipeActions}
          data-color={currentAction?.color}
          data-orientation={currentAction?.orientation}
        >
          {!!currentAction?.id && t(currentAction.labelKey)}
        </div>
      )}
    </div>
  );
};

export default Swipeable;
