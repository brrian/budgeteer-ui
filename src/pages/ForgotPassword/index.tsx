import Auth from '@aws-amplify/auth';
import React, { FC, useState } from 'react';
import { OnSubmit } from 'react-hook-form';
import { Link } from 'react-router-dom';
import AuthForm from '../../components/AuthForm';
import { PAGE_LOGIN } from '../../constants';
import useTranslation from '../../util/hooks/useTranslation';

interface FormValues {
  email: string;
}

const ForgotPasswordPage: FC = () => {
  const { t } = useTranslation('auth');

  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<string[]>();

  const handleFormSubmit: OnSubmit<FormValues> = async ({ email }) => {
    setIsLoading(true);

    await Auth.forgotPassword(email).catch(error => {
      setErrors([error.message]);
    });

    setIsLoading(false);
  };

  return (
    <AuthForm<FormValues>
      errors={errors}
      heading={t('forgotPassword')}
      inputs={[
        {
          name: 'email',
          label: t('email'),
          attrs: {
            autoFocus: true,
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

export default ForgotPasswordPage;
