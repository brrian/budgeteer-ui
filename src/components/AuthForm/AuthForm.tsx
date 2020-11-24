import React, {
  InputHTMLAttributes,
  PropsWithChildren,
  ReactElement,
  useEffect,
  useState,
} from 'react';
import {
  DeepPartial,
  FormProvider,
  SubmitHandler,
  UnpackNestedValue,
  useForm,
} from 'react-hook-form';
import useTranslation from '../../util/hooks/useTranslation';
import Form from '../Form';
import FormField from '../FormField';
import styles from './AuthForm.module.scss';

type FormValues = Record<string, any>;

interface Input {
  attrs?: InputHTMLAttributes<HTMLInputElement>;
  label: string;
  name: string;
}

interface AuthFormProps<TFormValues = FormValues> {
  defaultValues?: UnpackNestedValue<DeepPartial<TFormValues>>;
  errors?: string[];
  heading: string;
  inputs: Input[];
  isLoading?: boolean;
  onSubmit: SubmitHandler<TFormValues>;
}

const AuthForm = <TFormValues extends FormValues = FormValues>({
  children,
  defaultValues,
  errors: authErrors = [],
  heading,
  inputs,
  isLoading,
  onSubmit,
}: PropsWithChildren<AuthFormProps<TFormValues>>): ReactElement => {
  const { t } = useTranslation('validation');

  const formProps = useForm<TFormValues>({ defaultValues });
  const { handleSubmit, register } = formProps;

  const [formErrors, setFormErrors] = useState<string[]>([]);

  useEffect(() => {
    const errorMessages = Object.entries(formProps.errors).map(([field, error]) => {
      return error?.message || t(`${error?.type}`, { field: t(field) });
    });

    setFormErrors(errorMessages);
  }, [formProps.errors, t]);

  const errors = [...authErrors, ...formErrors];

  return (
    <div className={styles.container}>
      <FormProvider {...formProps}>
        <Form
          errors={errors}
          Footer={children}
          heading={heading}
          isLoading={isLoading}
          onSubmit={handleSubmit(onSubmit)}
        >
          {inputs.map(({ attrs, label, name }, index) => (
            <FormField key={name}>
              <label htmlFor={`input-${name}-${index}`}>{label}</label>
              <input
                {...attrs}
                id={`input-${name}-${index}`}
                name={name}
                ref={attrs?.required ? register({ required: true }) : register}
                required={false}
              />
            </FormField>
          ))}
        </Form>
      </FormProvider>
    </div>
  );
};

export default AuthForm;
