import React, { FC, useMemo } from 'react';
import { useUserState } from '../../util/contexts/UserContext';
import Select from '../Select';

interface CategorySelectProps {
  defaultValue?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
}

const CategorySelect: FC<CategorySelectProps> = props => {
  const { categories } = useUserState();

  const categoryOptions = useMemo(() => Array.from(categories.values()), [categories]);

  return <Select options={categoryOptions} {...props} />;
};

export default CategorySelect;
