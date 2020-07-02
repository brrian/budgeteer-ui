import React, { FC } from 'react';
import { Route, Switch } from 'react-router';
import { PAGE_FORGOT_PASSWORD, PAGE_LOGIN, PAGE_REGISTER } from '../../constants';
import useServiceWorkerUpdater from '../../util/hooks/useServiceWorkerUpdater';
import ForgotPasswordPage from '../../pages/ForgotPassword';
import LoginPage from '../../pages/LoginPage';
import RegisterPage from '../../pages/RegisterPage';
import TransactionsPage from '../../pages/Transactions';

const App: FC = () => {
  useServiceWorkerUpdater();

  return (
    <Switch>
      <Route path={PAGE_LOGIN} component={LoginPage} />
      <Route path={PAGE_FORGOT_PASSWORD} component={ForgotPasswordPage} />
      <Route path={PAGE_REGISTER} component={RegisterPage} />
      <Route path="/" component={TransactionsPage} />
    </Switch>
  );
};

export default App;
