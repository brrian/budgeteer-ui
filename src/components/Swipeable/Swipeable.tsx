import cc from 'classcat';
import React, { FC, useEffect, useRef, useState } from 'react';
import { animated, useSpring } from 'react-spring';
import { useDrag } from 'react-use-gesture';
import Button from '../Button';
import styles from './styles.module.scss';

export interface Action {
  breakpoints: {
    min: number;
    max: number;
  };
  color: string;
  id: string;
  label: string;
  orientation: string;
}

interface SwipeableProps {
  actions: Action[];
  className?: string;
  onAction: (action: string) => void;
}

const Swipeable: FC<SwipeableProps> = ({ actions, children, className, onAction }) => {
  const [props, set] = useSpring(() => ({ left: 0 }));

  const isBlockingMouseEvents = useRef(false);

  const [isSwiping, setIsSwiping] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

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

  const handleMouseClick = (actionId: string) => {
    setIsHovered(false);
    onAction(actionId);
  };

  const handleMouseOver = () => {
    if (isBlockingMouseEvents.current === true) {
      return;
    }

    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    isBlockingMouseEvents.current = false;

    setIsHovered(false);
  };

  const isTouchDevice =
    !!window.ontouchstart ||
    !!window.navigator.maxTouchPoints ||
    !!window.navigator.msMaxTouchPoints;

  return (
    <div className={styles.swipeContainer}>
      <animated.div
        {...(isTouchDevice ? bind() : undefined)}
        className={cc([
          className,
          {
            [styles.swipeItem]: true,
            [styles.isHovered]: isHovered,
            [styles.isSwiping]: isSwiping,
          },
        ])}
        onMouseLeave={!isTouchDevice ? handleMouseLeave : undefined}
        onMouseOver={!isTouchDevice ? handleMouseOver : undefined}
        style={props}
      >
        {children}
        {!isTouchDevice && (
          <div className={styles.hoverActions}>
            {actions.map(action => (
              <div className={styles.action} key={action.id}>
                <Button
                  data-color={action.color}
                  isLink
                  onClick={() => handleMouseClick(action.id)}
                >
                  {action.label}
                </Button>
              </div>
            ))}
          </div>
        )}
      </animated.div>
      {isTouchDevice && (
        <div
          className={styles.swipeActions}
          data-color={currentAction?.color}
          data-orientation={currentAction?.orientation}
        >
          {!!currentAction?.id && currentAction.label}
        </div>
      )}
    </div>
  );
};

export default Swipeable;
