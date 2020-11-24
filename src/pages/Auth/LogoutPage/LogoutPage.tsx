import { FC, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { PAGE_LOGIN } from '../../../constants';
import { useAuth } from '../../../util/contexts/AuthContext';

const LogoutPage: FC = () => {
  const { logout } = useAuth();

  const history = useHistory();

  useEffect(() => {
    const signOut = async () => {
      await logout();

      history.push(PAGE_LOGIN);
    };

    signOut();
  }, [history, logout]);

  return null;
};

export default LogoutPage;
