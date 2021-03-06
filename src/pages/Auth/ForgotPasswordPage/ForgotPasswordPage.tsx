import React, { FC, useState } from 'react';
import { SubmitHandler } from 'react-hook-form';
import { Link, useHistory } from 'react-router-dom';
import AuthForm from '../../../components/AuthForm';
import { PAGE_LOGIN, PAGE_RESET_PASSWORD } from '../../../constants';
import { sendResetCode } from '../../../util/contexts/AuthContext';
import useTranslation from '../../../util/hooks/useTranslation';

interface FormValues {
  email: string;
}

const ForgotPasswordPage: FC = () => {
  const history = useHistory();

  const { t } = useTranslation('auth');

  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<string[]>();

  const handleFormSubmit: SubmitHandler<FormValues> = ({ email }) => {
    setIsLoading(true);

    sendResetCode(email)
      .then(() => {
        history.push(PAGE_RESET_PASSWORD, { email });
      })
      .catch(error => {
        setErrors([error.message]);
      })
      .finally(() => {
        setIsLoading(false);
      });
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
