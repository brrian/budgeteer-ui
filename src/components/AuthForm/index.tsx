import React, {
  InputHTMLAttributes,
  PropsWithChildren,
  ReactElement,
  useEffect,
  useState,
} from 'react';
import { FieldError, FormContext, OnSubmit, useForm } from 'react-hook-form';
import useTranslation from '../../hooks/useTranslation';
import Button from '../Button';
import styles from './styles.module.scss';

type FormValues = Record<string, any>;

interface Input {
  attrs?: InputHTMLAttributes<HTMLInputElement>;
  label: string;
  name: string;
}

interface AuthFormProps<TFormValues = FormValues> {
  errors?: string[];
  heading: string;
  inputs: Input[];
  isLoading?: boolean;
  onSubmit: OnSubmit<TFormValues>;
}

const AuthForm = <TFormValues extends FormValues = FormValues>({
  children,
  errors: authErrors = [],
  heading,
  inputs,
  isLoading,
  onSubmit,
}: PropsWithChildren<AuthFormProps<TFormValues>>): ReactElement => {
  const { t } = useTranslation(['auth', 'validation']);

  const formProps = useForm<TFormValues>();
  const { handleSubmit, register } = formProps;

  const [formErrors, setFormErrors] = useState<string[]>([]);

  useEffect(() => {
    const errorMessages = Object.entries(formProps.errors).map(([field, error]) => {
      return t(`validation:${(error as FieldError)?.type}`, { field: t(field) });
    });

    setFormErrors(errorMessages);
  }, [formProps.errors, t]);

  const errors = [...authErrors, ...formErrors];

  return (
    <div className={styles.container}>
      <FormContext {...formProps}>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <h2 className={styles.formHeading}>{heading}</h2>
          {errors.length > 0 && (
            <ul className={styles.errors}>
              {errors.map(error => (
                <li key={error}>{t('error', { message: error })}</li>
              ))}
            </ul>
          )}
          <div>
            {inputs.map(({ attrs, label, name }) => (
              <div className={styles.fieldGroup} key={name}>
                <label>{label}</label>
                <input
                  {...attrs}
                  name={name}
                  ref={attrs?.required ? register({ required: true }) : register}
                  required={false}
                />
              </div>
            ))}
          </div>
          {children && <div className={styles.extras}>{children}</div>}
          <div className={styles.formActions}>
            <Button type="submit" disabled={isLoading}>
              {t('common:submit')}
            </Button>
          </div>
        </form>
      </FormContext>
    </div>
  );
};

export default AuthForm;
