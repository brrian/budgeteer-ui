import { Auth, CognitoUser } from '@aws-amplify/auth';
import React, { createContext, Dispatch, FC, useEffect, useReducer } from 'react';
import api from '../../helpers/api';
import { UserActions, UserState } from './models';
import userReducer from './userReducer';

const UserStateContext = createContext<UserState | undefined>(undefined);
const UserDispatchContext = createContext<Dispatch<UserActions> | undefined>(undefined);

const initialState: UserState = {
  isAuthenticated: false,
  isComplete: false,
  user: undefined,
};

export const UserContextProvider: FC = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, initialState);

  useEffect(() => {
    const getCurrentUser = async () => {
      const user: CognitoUser | undefined = await Auth.currentAuthenticatedUser().catch(error => {
        console.error('Unable to get current user', error);
      });

      const session = user?.getSignInUserSession();

      if (!session || !user) {
        return dispatch({ type: 'unsetUser' });
      }

      const token = session.getIdToken().getJwtToken();

      dispatch({
        type: 'setUser',
        payload: user,
      });

      api.setAuthToken(token);
    };

    getCurrentUser();
  }, []);

  useEffect(() => {
    const fetchGroup = async () => {
      const group = await api.fetchGroup();

      dispatch({ type: 'setGroup', payload: group });
    };

    if (state.user) {
      fetchGroup();
    }
  }, [state.user]);

  return (
    <UserStateContext.Provider value={state}>
      <UserDispatchContext.Provider value={dispatch}>{children}</UserDispatchContext.Provider>
    </UserStateContext.Provider>
  );
};
