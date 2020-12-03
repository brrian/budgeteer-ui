import { useMemo } from 'react';
import { useParams } from 'react-router';

interface MonthYearParams {
  month?: string;
  year?: string;
}

interface MonthYear {
  month: number;
  year: number;
}

export default function useMonthYearParams(): MonthYear {
  const { month, year } = useParams<MonthYearParams>();

  return useMemo(() => {
    const monthsByLabel: { [key: string]: number } = {
      jan: 1,
      feb: 2,
      mar: 3,
      apr: 4,
      may: 5,
      jun: 6,
      jul: 7,
      aug: 8,
      sept: 9,
      oct: 10,
      nov: 11,
      dec: 12,
    };

    const date = new Date();

    return {
      month: month ? monthsByLabel[month.toLowerCase()] : date.getMonth() + 1,
      year: year ? +year : date.getFullYear(),
    };
  }, [month, year]);
}
