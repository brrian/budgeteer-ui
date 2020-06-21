import { Auth } from 'aws-amplify';
import React, { FC, useState } from 'react';
import { OnSubmit } from 'react-hook-form';
import { Link } from 'react-router-dom';
import AuthForm from '../../components/AuthForm';
import { PAGE_FORGOT_PASSWORD } from '../../constants';
import useTranslation from '../../hooks/useTranslation';

interface FormValues {
  email: string;
  password: string;
}

const LoginPage: FC = () => {
  const { t } = useTranslation('auth');

  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<string[]>();

  const handleFormSubmit: OnSubmit<FormValues> = async ({ email, password }) => {
    setIsLoading(true);

    await Auth.signIn(email, password).catch(error => {
      setErrors([error.message]);
    });

    setIsLoading(false);
  };

  return (
    <AuthForm<FormValues>
      errors={errors}
      heading={t('login')}
      inputs={[
        {
          name: 'email',
          label: t('email'),
          attrs: {
            autoFocus: true,
            required: true,
          },
        },
        {
          name: 'password',
          label: t('password'),
          attrs: {
            required: true,
            type: 'password',
          },
        },
      ]}
      isLoading={isLoading}
      onSubmit={handleFormSubmit}
    >
      <Link to={PAGE_FORGOT_PASSWORD}>{t('forgotPassword')}</Link>
    </AuthForm>
  );
};

export default LoginPage;
