import React, { ChangeEvent, FC, useMemo, useState } from 'react';
import Button from '../Button';
import styles from './Select.module.scss';

interface Option {
  id: string;
  label: string;
}

interface SelectProps {
  defaultValue?: string;
  onChange?: (value: string) => void;
  options: Option[];
  placeholder?: string;
}

const Select: FC<SelectProps> = ({ defaultValue, onChange, options, placeholder }) => {
  const [value, setValue] = useState(defaultValue);

  const label = useMemo(() => {
    if (!value && placeholder) {
      return placeholder;
    }

    return options.find(option => option.id === value)?.label;
  }, [options, value]);

  const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const newValue = event.currentTarget.value;

    setValue(newValue);
    onChange?.(newValue);
  };

  return (
    <div className={styles.selectContainer}>
      <Button isLink>{label}</Button>
      <select
        defaultValue={placeholder ? '' : defaultValue}
        onChange={handleSelectChange}
        value={value}
      >
        {placeholder && (
          <option disabled value="">
            {placeholder}
          </option>
        )}
        {options.map(({ id, label }) => (
          <option key={id} value={id}>
            {label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
