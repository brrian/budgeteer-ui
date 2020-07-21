import cc from 'classcat';
import React, { ButtonHTMLAttributes, FC } from 'react';
import useTranslation from '../../util/hooks/useTranslation';
import styles from './styles.module.scss';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isLink?: boolean;
  isLoading?: boolean;
  isOutline?: boolean;
}

const Button: FC<ButtonProps> = ({ children, isLink, isLoading, isOutline, ...remainingProps }) => {
  const { t } = useTranslation();

  return (
    <button
      className={cc({
        [styles.button]: true,
        [styles.isLink]: isLink,
        [styles.isOutline]: isOutline,
      })}
      {...remainingProps}
    >
      {isLoading ? t('loading') : children}
    </button>
  );
};

export default Button;
