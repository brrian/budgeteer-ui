import Auth from '@aws-amplify/auth';
import { FC, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { PAGE_LOGIN } from '../../../constants';
import { useUserDispatch } from '../../../util/contexts/UserContext';

const LogoutPage: FC = () => {
  const history = useHistory();

  const dispatch = useUserDispatch();

  useEffect(() => {
    const signOut = async () => {
      await Auth.signOut();

      dispatch({ type: 'unsetUser' });

      history.push(PAGE_LOGIN);
    };

    signOut();
  }, [dispatch, history]);

  return null;
};

export default LogoutPage;
