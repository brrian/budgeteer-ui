import React, { FC, FormEvent, MouseEvent, ReactNode } from 'react';
import useTranslation from '../../util/hooks/useTranslation';
import Button from '../Button';
import Card from '../Card';
import styles from './Form.module.scss';

interface FormProps {
  className?: string;
  errors?: string[];
  Footer?: ReactNode;
  heading?: string;
  isLoading?: boolean;
  onCancel?: (event: MouseEvent<HTMLButtonElement>) => void;
  onSubmit?: (event: FormEvent<HTMLFormElement>) => void;
  submitLabel?: string;
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
  submitLabel,
}) => {
  const { t } = useTranslation();

  return (
    <form onSubmit={onSubmit}>
      <Card
        Buttons={
          <>
            <Button type="submit" disabled={isLoading}>
              {submitLabel ?? t('submit')}
            </Button>
            {onCancel && (
              <Button isOutline type="button" onClick={onCancel}>
                {t('cancel')}
              </Button>
            )}
          </>
        }
        className={className}
        heading={heading}
      >
        {errors.length > 0 && (
          <ul className={styles.errors}>
            {errors.map((error, index) => (
              <li key={`${error}-${index}`}>{t('error', { message: error })}</li>
            ))}
          </ul>
        )}
        <div>{children}</div>
        {Footer && <div className={styles.extras}>{Footer}</div>}
      </Card>
    </form>
  );
};

export default Form;
