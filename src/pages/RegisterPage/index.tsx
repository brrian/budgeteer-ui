import Auth from '@aws-amplify/auth';
import React, { FC, useState } from 'react';
import { OnSubmit } from 'react-hook-form';
import { Link } from 'react-router-dom';
import AuthForm from '../../components/AuthForm';
import { PAGE_LOGIN } from '../../constants';
import api from '../../util/helpers/api';
import useTranslation from '../../util/hooks/useTranslation';

interface FormValues {
  email: string;
  group: string;
  password: string;
}

const RegisterPage: FC = () => {
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

    await Auth.signUp({
      username: email,
      password,
      attributes: {
        'custom:groupId': group,
      },
    }).catch(error => {
      setErrors([error.message]);
    });

    setIsLoading(false);
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
      <Link to={PAGE_LOGIN}>{t('alreadyHaveAccount')}</Link>
    </AuthForm>
  );
};

export default RegisterPage;
