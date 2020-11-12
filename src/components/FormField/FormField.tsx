import React, { FC } from 'react';
import styles from './FormField.module.scss';

const FormField: FC = ({ children }) => {
  return <div className={styles.formField}>{children}</div>;
};

export default FormField;
