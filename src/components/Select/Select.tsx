import React, { ChangeEvent, FC, useMemo, useState } from 'react';
import Button from '../Button';
import styles from './Select.module.scss';

interface Option {
  id: string;
  label: string;
}

interface SelectProps {
  initialValue: string;
  onChange?: (value: string) => void;
  options: Option[];
}

const Select: FC<SelectProps> = ({ options, onChange, initialValue }) => {
  const [value, setValue] = useState(initialValue);

  const label = useMemo(() => options.find(option => option.id === value)?.label, [options, value]);

  const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const newValue = event.currentTarget.value;

    setValue(newValue);
    onChange?.(newValue);
  };

  return (
    <div className={styles.selectContainer}>
      <Button isLink>{label}</Button>
      <select value={value} onChange={handleSelectChange}>
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
