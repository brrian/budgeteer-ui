import cc from 'classcat';
import React, { ButtonHTMLAttributes, FC } from 'react';
import useTranslation from '../../util/hooks/useTranslation';
import styles from './styles.module.scss';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  isOutline?: boolean;
}

const Button: FC<ButtonProps> = ({ children, isLoading, isOutline, ...remainingProps }) => {
  const { t } = useTranslation();

  return (
    <button
      className={cc({
        [styles.button]: true,
        [styles.isOutline]: isOutline,
      })}
      {...remainingProps}
    >
      {isLoading ? t('loading') : children}
    </button>
  );
};

export default Button;
