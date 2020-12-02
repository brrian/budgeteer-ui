import { gql } from 'graphql-request';
import { useQuery } from 'react-query';
import useClient from '../util/hooks/useClient/useClient';
import { Budget, SuspendedQueryResult } from './models';

interface FetchMonthOverviewResponse {
  budgetByMonthYear: Budget;
}

interface FetchMonthOverviewResult {
  budget: Budget;
}

export default function useFetchMonthOverviewQuery(
  month: number,
  year: number = new Date().getFullYear()
): SuspendedQueryResult<FetchMonthOverviewResult> {
  const client = useClient();

  return useQuery(
    ['monthOverview', month, year],
    async () => {
      const { budgetByMonthYear } = await client.request<FetchMonthOverviewResponse>(
        gql`
          query FetchMonthOverview($month: Int!, $year: Int!) {
            budgetByMonthYear(month: $month, year: $year) {
              categories {
                categoryId
                limit
              }
              total
            }
          }
        `,
        {
          month,
          year,
        }
      );

      return {
        budget: budgetByMonthYear,
      };
    },
    {
      staleTime: 1000 * 60 * 60 * 2, // 2 hours
    }
  ) as SuspendedQueryResult<FetchMonthOverviewResult>;
}
