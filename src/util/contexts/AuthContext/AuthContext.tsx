import Auth, { CognitoUser } from '@aws-amplify/auth';
import React, { createContext, FC, useContext, useEffect, useState } from 'react';
import getToken from './util/getToken';

interface AuthContext extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

interface AuthState {
  status: 'pending' | 'resolved';
  token?: string;
  user?: CognitoUser;
}

const AuthContext = createContext<AuthContext | undefined>(undefined);
AuthContext.displayName = 'AuthContext';

export function useAuth(): AuthContext {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthContextProvider');
  }

  return context;
}

export const AuthContextProvider: FC = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>({
    status: 'pending',
  });

  useEffect(() => {
    const getCurrentUser = async () => {
      const user: CognitoUser | undefined = await Auth.currentAuthenticatedUser().catch(error => {
        console.error('Unable to get current user:', error);
      });

      const token = getToken(user);

      setAuthState({
        status: 'resolved',
        token,
        user,
      });
    };

    getCurrentUser();
  }, []);

  const login = async (email: string, password: string) => {
    const user = await Auth.signIn(email, password);

    const token = getToken(user);

    setAuthState({
      status: 'resolved',
      token,
      user,
    });
  };

  const logout = async () => {
    await Auth.signOut();

    setAuthState({
      status: 'resolved',
    });
  };

  return (
    <AuthContext.Provider
      value={{
        ...authState,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
