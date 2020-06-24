import Auth from '@aws-amplify/auth';
import React, { FC, useState } from 'react';
import { OnSubmit } from 'react-hook-form';
import { Link, useHistory } from 'react-router-dom';
import AuthForm from '../../components/AuthForm';
import { PAGE_FORGOT_PASSWORD, PAGE_TRANSACTIONS } from '../../constants';
import useTranslation from '../../util/hooks/useTranslation';

interface FormValues {
  email: string;
  password: string;
}

const LoginPage: FC = () => {
  const history = useHistory();

  const { t } = useTranslation('auth');

  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<string[]>();

  const handleFormSubmit: OnSubmit<FormValues> = async ({ email, password }) => {
    setErrors([]);
    setIsLoading(true);

    const user = await Auth.signIn(email, password).catch(error => {
      return setErrors([error.message]);
    });

    if (user) {
      history.push(PAGE_TRANSACTIONS);
    }

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
