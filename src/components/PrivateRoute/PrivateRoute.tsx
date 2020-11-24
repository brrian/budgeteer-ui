import React, { FC } from 'react';
import { Redirect, Route, RouteProps } from 'react-router';
import { PAGE_LOGIN } from '../../constants';
import { useAuth } from '../../util/contexts/AuthContext';

const PrivateRoute: FC<RouteProps> = ({ children, component: Component, ...remainingProps }) => {
  const { status, user } = useAuth();

  return status === 'resolved' ? (
    <Route
      {...remainingProps}
      render={props =>
        !user ? (
          <Redirect
            to={{
              pathname: PAGE_LOGIN,
              state: {
                redirect: props.location,
              },
            }}
          />
        ) : Component ? (
          <Component {...props} />
        ) : (
          children
        )
      }
    />
  ) : null;
};

export default PrivateRoute;
