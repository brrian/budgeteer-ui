import Amplify from '@aws-amplify/core';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './components/App';
import './index.scss';
import * as serviceWorker from './serviceWorker';
import { UserContextProvider } from './util/contexts/UserContext';

Amplify.configure({
  Auth: {
    region: process.env.REACT_APP_COGNITO_REGION,
    userPoolId: process.env.REACT_APP_COGNITO_USER_POOL_ID,
    userPoolWebClientId: process.env.REACT_APP_COGNITO_USER_POOL_CLIENT_ID,
    cookieStorage: {
      domain: process.env.REACT_APP_COGNITO_COOKIE_DOMAIN,
      path: '/',
      expires: 365,
      secure: process.env.REACT_APP_COGNITO_SECURE !== 'false',
    },
  },
});

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <UserContextProvider>
        <App />
      </UserContextProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.register({
  onUpdate() {
    window.postMessage('updateAvailable', '*');
  },
});
