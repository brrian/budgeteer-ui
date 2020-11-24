import { CognitoUser } from '@aws-amplify/auth';

export default function getToken(user?: CognitoUser): string | undefined {
  const session = user?.getSignInUserSession();

  const token = session?.getIdToken().getJwtToken();

  return token;
}
