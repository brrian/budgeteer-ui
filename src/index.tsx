import Amplify from '@aws-amplify/core';
import React from 'react';
import ReactDOM from 'react-dom';
import { QueryCache, ReactQueryCacheProvider } from 'react-query';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './components/App';
import './index.scss';
import * as serviceWorker from './serviceWorker';
import { AuthContextProvider } from './util/contexts/AuthContext';
import { initTheme } from './util/helpers/theme';

Amplify.configure({
  Auth: {
    region: process.env.REACT_APP_COGNITO_REGION,
    userPoolId: process.env.REACT_APP_COGNITO_USER_POOL_ID,
    userPoolWebClientId: process.env.REACT_APP_COGNITO_USER_POOL_CLIENT_ID,
    cookieStorage:
      process.env.REACT_APP_COGNITO_USE_COOKIE !== 'false'
        ? {
            domain: process.env.REACT_APP_COGNITO_COOKIE_DOMAIN,
            path: '/',
            expires: 365,
            secure: process.env.REACT_APP_COGNITO_SECURE !== 'false',
          }
        : undefined,
  },
});

const queryCache = new QueryCache({
  defaultConfig: {
    queries: {
      retry: 0,
      suspense: true,
    },
  },
});

initTheme();

ReactDOM.render(
  <React.StrictMode>
    <ReactQueryCacheProvider queryCache={queryCache}>
      <AuthContextProvider>
        <Router>
          <App />
        </Router>
      </AuthContextProvider>
    </ReactQueryCacheProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.register({
  onUpdate() {
    window.postMessage('updateAvailable', '*');
  },
});
