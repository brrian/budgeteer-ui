import { gql } from 'graphql-request';
import { useQuery } from 'react-query';
import useClient from '../util/hooks/useClient/useClient';
import mockCategories from './mockCategories';
import { Group, SuspendedQueryResult } from './models';

interface FetchGroupResponse {
  group: {
    id: string;
    name: string;
  };
}

export default function useFetchGroupQuery(): SuspendedQueryResult<Group> {
  const client = useClient();

  return useQuery(
    'group',
    async () => {
      const { group } = await client.request<FetchGroupResponse>(gql`
        query {
          group {
            id
            name
          }
        }
      `);

      return {
        ...group,
        categories: mockCategories,
      };
    },
    {
      staleTime: 1000 * 60 * 60 * 2, // 2 hours
    }
  ) as SuspendedQueryResult<Group>;
}
