import Auth from '@aws-amplify/auth';
import React, { FC, useState } from 'react';
import { OnSubmit } from 'react-hook-form';
import { Link, useHistory, useLocation } from 'react-router-dom';
import AuthForm from '../../components/AuthForm';
import { PAGE_LOGIN, PAGE_REGISTER_VERIFY } from '../../constants';
import useTranslation from '../../util/hooks/useTranslation';

interface FormValues {
  email: string;
}

interface LocationState {
  email?: string;
}

const ResendVerificationPage: FC = () => {
  const location = useLocation<LocationState>();
  const history = useHistory();

  const { t } = useTranslation('auth');

  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<string[]>();

  const handleFormSubmit: OnSubmit<FormValues> = async ({ email }) => {
    setErrors([]);
    setIsLoading(true);

    await Auth.resendSignUp(email).catch(error => {
      setErrors([error.message]);
    });

    setIsLoading(false);

    history.push(PAGE_REGISTER_VERIFY, { email });
  };

  const defaultEmail = location.state?.email;

  return (
    <AuthForm<FormValues>
      defaultValues={{
        email: defaultEmail,
      }}
      errors={errors}
      heading={t('resendCode')}
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
      <p>
        <Link to={PAGE_LOGIN}>{t('alreadyHaveAccount')}</Link>
      </p>
    </AuthForm>
  );
};

export default ResendVerificationPage;
