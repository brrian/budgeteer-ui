import { Auth } from 'aws-amplify';
import { useEffect, useState } from 'react';
import api from '../../util/api';

export default function useAuth() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getCurrentUser = async () => {
      const user = await Auth.currentAuthenticatedUser();

      const session = user.getSignInUserSession();

      const token = session.getIdToken().getJwtToken();

      api.setAuthToken(token);

      setIsLoading(false);
    };

    getCurrentUser();
  }, []);

  return { isLoading };
}
