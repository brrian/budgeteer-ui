import { CognitoUser } from '@aws-amplify/auth';
import { useEffect } from 'react';
import { useHistory, useLocation } from 'react-router';
import { PAGE_LOGIN } from '../../../constants';
import { useUserState } from '../../contexts/UserContext';
import { FetchGroupResponse } from '../../helpers/api/models';

type AuthResponse = AuthSuccess | AuthFailure;

interface AuthFailure {
  group: undefined;
  isReady: false;
  user: undefined;
}

interface AuthSuccess {
  group: FetchGroupResponse;
  isReady: true;
  user: CognitoUser;
}

export default function useAuth(): AuthResponse {
  const history = useHistory();
  const location = useLocation();

  const { group, isAuthenticated, isComplete, user } = useUserState();

  useEffect(() => {
    if (!isAuthenticated && isComplete) {
      history.push(PAGE_LOGIN, { redirect: location.pathname });
    }
  }, [history, isAuthenticated, isComplete, location]);

  if (isAuthenticated && isComplete && group && user) {
    return {
      isReady: true,
      user,
      group,
    };
  }

  return {
    isReady: false,
    user: undefined,
    group: undefined,
  };
}
