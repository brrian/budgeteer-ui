import { gql } from 'graphql-request';
import { useQuery } from 'react-query';
import useClient from '../util/hooks/useClient/useClient';
import { Budget, MonthOverview, SuspendedQueryResult, Transaction } from './models';

interface FetchMonthOverviewResponse {
  budgetByMonthYear: Budget;
  transactionsByMonthYear: Transaction[];
}

export default function useFetchMonthOverviewQuery(
  month: number,
  year: number = new Date().getFullYear()
): SuspendedQueryResult<MonthOverview> {
  const client = useClient();

  return useQuery(
    ['monthOverview', month, year],
    async () => {
      const { budgetByMonthYear, transactionsByMonthYear } = await client.request<
        FetchMonthOverviewResponse
      >(
        gql`
          query FetchMonthOverview($month: Int!, $year: Int!) {
            budgetByMonthYear(month: $month, year: $year) {
              categories {
                categoryId
                limit
              }
              total
            }
            transactionsByMonthYear(month: $month, year: $year) {
              amount
              categoryId
              date
              description
              disabled
              id
              note
              serviceId
              splits {
                amount
                categoryId
                disabled
                id
                note
              }
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
        transactions: new Map(
          transactionsByMonthYear.map(transaction => [transaction.id, transaction])
        ),
      };
    },
    {
      staleTime: 1000 * 60 * 60 * 2, // 2 hours
    }
  ) as SuspendedQueryResult<MonthOverview>;
}
