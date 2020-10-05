import React, { FC } from 'react';
import Button from '../Button';
import styles from './SplitTransactionForm.module.scss';

const SplitTransactionForm: FC = () => {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.content}>
          <Button isLink>Select category</Button>
          <input className={styles.noteInput} placeholder="Add note" />
        </div>
        <div className={styles.amountInput}>
          <span>$</span>
          <input placeholder="0.00" />
        </div>
      </div>
      <Button>Save</Button>
    </>
  );
};

export default SplitTransactionForm;
