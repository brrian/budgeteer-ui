import React, { forwardRef, SelectHTMLAttributes, useMemo } from 'react';
import useCategories from '../../util/hooks/useCategories';

type CategorySelectProps = SelectHTMLAttributes<HTMLSelectElement>;

const CategorySelect = forwardRef<HTMLSelectElement, CategorySelectProps>(
  ({ placeholder, ...remainingProps }, ref) => {
    const categories = useCategories();

    const categoryOptions = useMemo(
      () => Array.from(categories.entries()).map(([value, label]) => ({ label, value })),
      [categories]
    );

    return (
      <select {...remainingProps} ref={ref}>
        {placeholder && (
          <option disabled value="">
            {placeholder}
          </option>
        )}
        {categoryOptions.map(({ label, value }) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>
    );
  }
);

export default CategorySelect;
