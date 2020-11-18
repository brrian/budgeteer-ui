import cc from 'classcat';
import React, { FC, ReactNode } from 'react';
import styles from './Card.module.scss';

interface CardProps {
  className?: string;
  heading?: string;
  Buttons?: ReactNode;
}

const Card: FC<CardProps> = ({ Buttons, children, className, heading }) => {
  return (
    <aside
      className={cc([
        className,
        {
          [styles.card]: true,
          [styles.hasButtons]: !!Buttons,
        },
      ])}
    >
      {heading && <h2 className={styles.heading}>{heading}</h2>}
      {children}
      {Buttons && <div className={styles.buttons}>{Buttons}</div>}
    </aside>
  );
};

export default Card;
