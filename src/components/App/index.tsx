import React, { FC } from 'react';
import { Route, Switch } from 'react-router';
import {
  PAGE_FORGOT_PASSWORD,
  PAGE_LOGIN,
  PAGE_REGISTER,
  PAGE_REGISTER_RESEND,
  PAGE_REGISTER_VERIFY,
} from '../../constants';
import ForgotPasswordPage from '../../pages/Auth/ForgotPasswordPage';
import LoginPage from '../../pages/Auth/LoginPage';
import RegisterPage from '../../pages/Auth/RegisterPage';
import RegisterVerifyPage from '../../pages/Auth/RegisterVerifyPage';
import ResendVerificationPage from '../../pages/Auth/ResendVerificationPage';
import TransactionsPage from '../../pages/Transactions';
import useServiceWorkerUpdater from '../../util/hooks/useServiceWorkerUpdater';

const App: FC = () => {
  useServiceWorkerUpdater();

  return (
    <Switch>
      <Route path={PAGE_LOGIN} component={LoginPage} />
      <Route path={PAGE_FORGOT_PASSWORD} component={ForgotPasswordPage} />
      <Route path={PAGE_REGISTER_RESEND} component={ResendVerificationPage} />
      <Route path={PAGE_REGISTER_VERIFY} component={RegisterVerifyPage} />
      <Route path={PAGE_REGISTER} component={RegisterPage} />
      <Route path="/" component={TransactionsPage} />
    </Switch>
  );
};

export default App;
