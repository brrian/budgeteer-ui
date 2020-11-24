import { GraphQLClient } from 'graphql-request';
import { useAuth } from '../../contexts/AuthContext';

export default function useClient(): GraphQLClient {
  const { token } = useAuth();

  if (!token) {
    throw new Error('A token is required for useClient');
  }

  return new GraphQLClient('/graphql', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
