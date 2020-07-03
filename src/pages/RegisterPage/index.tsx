import Auth from '@aws-amplify/auth';
import React, { FC, useState } from 'react';
import { OnSubmit } from 'react-hook-form';
import { Link, useHistory } from 'react-router-dom';
import AuthForm from '../../components/AuthForm';
import { PAGE_FORGOT_PASSWORD, PAGE_LOGIN, PAGE_REGISTER_VERIFY } from '../../constants';
import api from '../../util/helpers/api';
import useTranslation from '../../util/hooks/useTranslation';

interface FormValues {
  email: string;
  group: string;
  password: string;
}

const RegisterPage: FC = () => {
  const history = useHistory();

  const { t } = useTranslation('auth');

  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<string[]>();

  const handleFormSubmit: OnSubmit<FormValues> = async ({ email, group, password }) => {
    setErrors([]);
    setIsLoading(true);

    const { isValid } = await api.validateGroup(group);

    if (!isValid) {
      setIsLoading(false);
      return setErrors([t('invalidGroup')]);
    }

    const results = await Auth.signUp({
      username: email,
      password,
      attributes: {
        'custom:groupId': group,
      },
    }).catch(error => {
      setErrors([error.message]);
    });

    setIsLoading(false);

    if (results && results.user) {
      history.push(PAGE_REGISTER_VERIFY, { email });
    }
  };

  return (
    <AuthForm<FormValues>
      errors={errors}
      heading={t('register')}
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
        {
          name: 'group',
          label: t('group'),
          attrs: {
            required: true,
          },
        },
      ]}
      isLoading={isLoading}
      onSubmit={handleFormSubmit}
    >
      <p>
        <Link to={PAGE_LOGIN}>{t('alreadyHaveAccount')}</Link>
      </p>
      <p>
        <Link to={PAGE_FORGOT_PASSWORD}>{t('forgotPassword')}</Link>
      </p>
    </AuthForm>
  );
};

export default RegisterPage;
