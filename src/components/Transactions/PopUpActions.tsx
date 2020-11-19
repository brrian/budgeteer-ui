import React, { FC, useState } from 'react';
import useTranslation from '../../util/hooks/useTranslation';
import Button from '../Button';
import { Action } from '../Swipeable/Swipeable';
import styles from './PopUpActions.module.scss';

interface PopUpActionsProps {
  actions: Action[];
  onAction: (action: string) => void;
}

const PopUpActions: FC<PopUpActionsProps> = ({ actions, onAction }) => {
  const { t } = useTranslation();

  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <aside
      className={styles.popUpActions}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <span className={styles.menuButton}>𐄁𐄁𐄁</span>
      {isHovered && (
        <div className={styles.popUpWrapper}>
          <div className={styles.popUp}>
            {actions.map(({ color, id, labelKey }) => (
              <Button
                className={styles.actionButton}
                data-color={color}
                key={id}
                onClick={() => onAction(id)}
              >
                {t(labelKey)}
              </Button>
            ))}
          </div>
        </div>
      )}
    </aside>
  );
};

export default PopUpActions;
