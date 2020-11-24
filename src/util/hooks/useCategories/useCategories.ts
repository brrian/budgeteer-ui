import { useFetchGroupQuery } from '../../../graphql';
import { Categories } from '../../../graphql/models';

export default function useCategories(): Categories {
  const { data } = useFetchGroupQuery();

  return data.categories;
}
