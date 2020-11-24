import React, { forwardRef, SelectHTMLAttributes, useMemo } from 'react';
import useCategories from '../../util/hooks/useCategories';

type CategorySelectProps = SelectHTMLAttributes<HTMLSelectElement>;

const CategorySelect = forwardRef<HTMLSelectElement, CategorySelectProps>(
  ({ placeholder, ...remainingProps }, ref) => {
    const categories = useCategories();

    const categoryOptions = useMemo(() => Array.from(categories.values()), [categories]);

    return (
      <select {...remainingProps} ref={ref}>
        {placeholder && (
          <option disabled value="">
            {placeholder}
          </option>
        )}
        {categoryOptions.map(({ id, label }) => (
          <option key={id} value={id}>
            {label}
          </option>
        ))}
      </select>
    );
  }
);

export default CategorySelect;
