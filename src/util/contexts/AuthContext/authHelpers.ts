import Auth from '@aws-amplify/auth';
import validateGroup from '../../helpers/validateGroup';

export async function register(email: string, password: string, groupId: string): Promise<void> {
  const isValid = await validateGroup(groupId);

  if (!isValid) {
    throw new Error('Invalid group');
  }

  await Auth.signUp({
    username: email,
    password,
    attributes: {
      'custom:groupId': groupId,
    },
  });
}

export async function resendVerificationCode(email: string): Promise<void> {
  await Auth.resendSignUp(email);
}

export async function resetPassword(
  email: string,
  code: string,
  newPassword: string
): Promise<void> {
  await Auth.forgotPasswordSubmit(email, code, newPassword);
}

export async function sendResetCode(email: string): Promise<void> {
  await Auth.forgotPassword(email);
}

export async function verifyAccount(email: string, code: string): Promise<void> {
  await Auth.confirmSignUp(email, code);
}
