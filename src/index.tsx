import Amplify from 'aws-amplify';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './components/App';
import './index.scss';
import * as serviceWorker from './serviceWorker';

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
      <App />
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.register({
  onUpdate() {
    window.postMessage('updateAvailable', '*');
  },
});
