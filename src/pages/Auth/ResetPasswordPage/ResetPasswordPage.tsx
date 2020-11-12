import Auth from '@aws-amplify/auth';
import React, { FC, useState } from 'react';
import { SubmitHandler } from 'react-hook-form';
import { Link, useHistory, useLocation } from 'react-router-dom';
import AuthForm from '../../../components/AuthForm';
import { PAGE_LOGIN } from '../../../constants';
import useTranslation from '../../../util/hooks/useTranslation';

interface FormValues {
  code: string;
  email: string;
  newPassword: string;
}

interface LocationState {
  email: string;
}

const ResetPasswordPage: FC = () => {
  const location = useLocation<LocationState>();
  const history = useHistory();

  const { t } = useTranslation('auth');

  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<string[]>();

  const handleFormSubmit: SubmitHandler<FormValues> = async ({ code, email, newPassword }) => {
    setIsLoading(true);

    const hasError = await Auth.forgotPasswordSubmit(email, code, newPassword).catch(error => {
      setErrors([error.message]);

      return true;
    });

    setIsLoading(false);

    if (!hasError) {
      history.push(PAGE_LOGIN, { email });
    }
  };

  const defaultEmail = location.state?.email;

  return (
    <AuthForm<FormValues>
      defaultValues={{
        email: defaultEmail,
      }}
      errors={errors}
      heading={t('resetPassword')}
      inputs={[
        {
          name: 'email',
          label: t('email'),
          attrs: {
            autoFocus: !defaultEmail,
            required: true,
          },
        },
        {
          name: 'code',
          label: t('code'),
          attrs: {
            autoFocus: !!defaultEmail,
            required: true,
          },
        },
        {
          name: 'newPassword',
          label: t('newPassword'),
          attrs: {
            required: true,
            type: 'password',
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

export default ResetPasswordPage;
