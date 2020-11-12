import cc from 'classcat';
import React, { FC, FormEvent, MouseEvent, ReactNode } from 'react';
import useTranslation from '../../util/hooks/useTranslation';
import Button from '../Button';
import styles from './Form.module.scss';

interface FormProps {
  className?: string;
  errors?: string[];
  Footer?: ReactNode;
  heading?: string;
  isLoading?: boolean;
  onCancel?: (event: MouseEvent<HTMLButtonElement>) => void;
  onSubmit?: (event: FormEvent<HTMLFormElement>) => void;
}

const Form: FC<FormProps> = ({
  children,
  className,
  errors = [],
  Footer,
  heading,
  isLoading,
  onCancel,
  onSubmit,
}) => {
  const { t } = useTranslation();

  return (
    <form className={cc([styles.form, className])} onSubmit={onSubmit}>
      {heading && <h2 className={styles.formHeading}>{heading}</h2>}
      {errors.length > 0 && (
        <ul className={styles.errors}>
          {errors.map((error, index) => (
            <li key={`${error}-${index}`}>{t('error', { message: error })}</li>
          ))}
        </ul>
      )}
      <div>{children}</div>
      {Footer && <div className={styles.extras}>{Footer}</div>}
      <div className={styles.formActions}>
        <Button type="submit" disabled={isLoading}>
          {t('submit')}
        </Button>
        {onCancel && (
          <Button isOutline type="button" onClick={onCancel}>
            {t('cancel')}
          </Button>
        )}
      </div>
    </form>
  );
};

export default Form;
