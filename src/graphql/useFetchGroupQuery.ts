import { gql } from 'graphql-request';
import { useQuery } from 'react-query';
import useClient from '../util/hooks/useClient/useClient';
import { Group, SuspendedQueryResult } from './models';

interface FetchGroupResponse {
  group: {
    categories: Array<[string, string]>;
    id: string;
    name: string;
    runningBalance: number;
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
            categories
            id
            name
          }
        }
      `);

      return {
        ...group,
        categories: new Map(group.categories),
      };
    },
    {
      staleTime: 1000 * 60 * 60 * 2, // 2 hours
    }
  ) as SuspendedQueryResult<Group>;
}
