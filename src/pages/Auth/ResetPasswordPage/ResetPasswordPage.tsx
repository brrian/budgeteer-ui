import React, { FC, useState } from 'react';
import { SubmitHandler } from 'react-hook-form';
import { Link, useHistory, useLocation } from 'react-router-dom';
import AuthForm from '../../../components/AuthForm';
import { PAGE_LOGIN } from '../../../constants';
import { resetPassword } from '../../../util/contexts/AuthContext';
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

  const handleFormSubmit: SubmitHandler<FormValues> = ({ code, email, newPassword }) => {
    setIsLoading(true);

    resetPassword(email, code, newPassword)
      .then(() => {
        history.push(PAGE_LOGIN, { email });
      })
      .catch(error => {
        setErrors([error.message]);
      })
      .finally(() => {
        setIsLoading(false);
      });
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
