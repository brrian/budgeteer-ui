import Auth from '@aws-amplify/auth';
import React, { FC, useState } from 'react';
import { SubmitHandler } from 'react-hook-form';
import { Link, useHistory, useLocation } from 'react-router-dom';
import AuthForm from '../../../components/AuthForm';
import {
  PAGE_FORGOT_PASSWORD,
  PAGE_REGISTER,
  PAGE_REGISTER_VERIFY,
  PAGE_TRANSACTIONS,
} from '../../../constants';
import { getCurrentUser, useUserDispatch } from '../../../util/contexts/UserContext';
import useTranslation from '../../../util/hooks/useTranslation';

interface FormValues {
  email: string;
  password: string;
}

interface LocationState {
  email: string;
  redirect: string;
}

const LoginPage: FC = () => {
  const location = useLocation<LocationState>();
  const history = useHistory();

  const { t } = useTranslation('auth');

  const userDispatch = useUserDispatch();

  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<string[]>();

  const handleFormSubmit: SubmitHandler<FormValues> = async ({ email, password }) => {
    setErrors([]);
    setIsLoading(true);

    const user = await Auth.signIn(email, password).catch(error => {
      if (error.message === 'User is not confirmed.') {
        return history.push(PAGE_REGISTER_VERIFY, { email });
      }

      return setErrors([error.message]);
    });

    setIsLoading(false);

    if (user) {
      const route = location.state?.redirect ?? PAGE_TRANSACTIONS;

      await getCurrentUser(userDispatch);

      history.push(route);
    }
  };

  const defaultEmail = location.state?.email;

  return (
    <AuthForm<FormValues>
      defaultValues={{
        email: defaultEmail,
      }}
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
      <p>
        <Link to={PAGE_FORGOT_PASSWORD}>{t('forgotPassword')}</Link>
      </p>
      <p>
        <Link to={PAGE_REGISTER}>{t('haventRegistered')}</Link>
      </p>
    </AuthForm>
  );
};

export default LoginPage;
