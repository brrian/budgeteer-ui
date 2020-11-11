import cc from 'classcat';
import React, { ChangeEvent, FC, useState } from 'react';
import styles from './ButtonInput.module.scss';

interface ButtonInputProps {
  className?: string;
  defaultValue?: string;
  formatLabel?: (value?: string, placeholder?: string) => string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  value?: string;
}

const ButtonInput: FC<ButtonInputProps> = ({
  className,
  defaultValue,
  formatLabel,
  onChange,
  placeholder,
  value,
}) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleButtonClick = () => {
    setIsEditing(true);
  };

  const handleInputBlur = () => {
    setIsEditing(false);
  };

  return (
    <div className={cc([styles.buttonInput, className])}>
      {!isEditing ? (
        <button className={styles.button} onClick={handleButtonClick}>
          {formatLabel
            ? formatLabel(value || defaultValue, placeholder)
            : value || defaultValue || placeholder}
        </button>
      ) : (
        <input
          autoFocus
          className={styles.input}
          defaultValue={defaultValue}
          onBlur={handleInputBlur}
          onChange={onChange}
          placeholder={placeholder}
          type="text"
          value={value}
        />
      )}
    </div>
  );
};

export default ButtonInput;
