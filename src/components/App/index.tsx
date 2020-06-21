import React, { FC } from 'react';
import { Route, Switch } from 'react-router';
import { PAGE_FORGOT_PASSWORD, PAGE_LOGIN } from '../../constants';
import ForgotPasswordPage from '../../pages/ForgotPassword';
import LoginPage from '../../pages/LoginPage';

const App: FC = () => {
  return (
    <Switch>
      <Route path={PAGE_LOGIN} component={LoginPage} />
      <Route path={PAGE_FORGOT_PASSWORD} component={ForgotPasswordPage} />
    </Switch>
  );
};

export default App;
