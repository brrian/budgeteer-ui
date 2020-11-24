import React, { FC, useState } from 'react';
import { SubmitHandler } from 'react-hook-form';
import { Link, useHistory, useLocation } from 'react-router-dom';
import AuthForm from '../../../components/AuthForm';
import { PAGE_LOGIN, PAGE_REGISTER_RESEND, PAGE_TRANSACTIONS } from '../../../constants';
import { verifyAccount } from '../../../util/contexts/AuthContext';
import useTranslation from '../../../util/hooks/useTranslation';

interface FormValues {
  email: string;
  code: string;
}

interface LocationState {
  email?: string;
}

const RegisterVerifyPage: FC = () => {
  const location = useLocation<LocationState>();
  const history = useHistory();

  const { t } = useTranslation('auth');

  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<string[]>();

  const handleFormSubmit: SubmitHandler<FormValues> = ({ email, code }) => {
    setErrors([]);
    setIsLoading(true);

    verifyAccount(email, code)
      .then(() => {
        history.push(PAGE_TRANSACTIONS);
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
      heading={t('verifyAccount')}
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
      ]}
      isLoading={isLoading}
      onSubmit={handleFormSubmit}
    >
      <p>
        <Link
          to={{
            pathname: PAGE_REGISTER_RESEND,
            state: { email: defaultEmail },
          }}
        >
          {t('resendVerificationEmail')}
        </Link>
      </p>
      <p>
        <Link to={PAGE_LOGIN}>{t('alreadyHaveAccount')}</Link>
      </p>
    </AuthForm>
  );
};

export default RegisterVerifyPage;
