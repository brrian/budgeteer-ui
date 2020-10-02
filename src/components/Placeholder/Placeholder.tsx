import React, { FC } from 'react';
import styles from './Placeholder.module.scss';

interface PlaceholderProps {
  size?: number;
}

const Placeholder: FC<PlaceholderProps> = ({ size }) => {
  return (
    <span className={styles.placeholder} style={{ width: size }}>
      &nbsp;
    </span>
  );
};

export default Placeholder;
