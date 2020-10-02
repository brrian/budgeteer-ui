import cc from 'classcat';
import React, { ButtonHTMLAttributes, FC } from 'react';
import useTranslation from '../../util/hooks/useTranslation';
import styles from './Button.module.scss';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isLink?: boolean;
  isLoading?: boolean;
  isOutline?: boolean;
}

const Button: FC<ButtonProps> = ({
  children,
  className,
  isLink,
  isLoading,
  isOutline,
  ...remainingProps
}) => {
  const { t } = useTranslation();

  return (
    <button
      {...remainingProps}
      className={cc([
        className,
        {
          [styles.button]: true,
          [styles.isLink]: isLink,
          [styles.isOutline]: isOutline,
        },
      ])}
    >
      {isLoading ? t('loading') : children}
    </button>
  );
};

export default Button;
