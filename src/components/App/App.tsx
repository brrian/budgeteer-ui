import React, { FC } from 'react';
import { Route, Switch } from 'react-router';
import {
  PAGE_FORGOT_PASSWORD,
  PAGE_LOGIN,
  PAGE_LOGOUT,
  PAGE_REGISTER,
  PAGE_REGISTER_RESEND,
  PAGE_REGISTER_VERIFY,
  PAGE_RESET_PASSWORD,
} from '../../constants';
import ForgotPasswordPage from '../../pages/Auth/ForgotPasswordPage';
import LoginPage from '../../pages/Auth/LoginPage';
import LogoutPage from '../../pages/Auth/LogoutPage';
import RegisterPage from '../../pages/Auth/RegisterPage';
import RegisterVerifyPage from '../../pages/Auth/RegisterVerifyPage';
import ResendVerificationPage from '../../pages/Auth/ResendVerificationPage';
import ResetPasswordPage from '../../pages/Auth/ResetPasswordPage';
import TransactionsPage from '../../pages/TransactionsPage';
import useServiceWorkerUpdater from '../../util/hooks/useServiceWorkerUpdater';
import PrivateRoute from '../PrivateRoute';

const App: FC = () => {
  useServiceWorkerUpdater();

  return (
    <Switch>
      <Route path={PAGE_FORGOT_PASSWORD} component={ForgotPasswordPage} exact />
      <Route path={PAGE_LOGIN} component={LoginPage} exact />
      <Route path={PAGE_LOGOUT} component={LogoutPage} exact />
      <Route path={PAGE_REGISTER_RESEND} component={ResendVerificationPage} exact />
      <Route path={PAGE_REGISTER_VERIFY} component={RegisterVerifyPage} exact />
      <Route path={PAGE_REGISTER} component={RegisterPage} exact />
      <Route path={PAGE_RESET_PASSWORD} component={ResetPasswordPage} exact />
      <PrivateRoute
        component={TransactionsPage}
        exact
        path="/:month(jan|feb|mar|apr|may|jun|jul|aug|sept|oct|nov|dec)?/:year(\d{4})?"
      />
    </Switch>
  );
};

export default App;
