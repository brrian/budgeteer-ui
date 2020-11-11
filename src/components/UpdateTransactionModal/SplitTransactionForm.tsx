import React, { ChangeEvent, FC, useState } from 'react';
import useTranslation from '../../util/hooks/useTranslation';
import Button from '../Button';
import ButtonInput from '../ButtonInput';
import CategorySelect from '../CategorySelect';
import styles from './SplitTransactionForm.module.scss';

const SplitTransactionForm: FC = () => {
  const { t } = useTranslation();

  const [amount, setAmount] = useState<string>();
  const [note, setNote] = useState<string>();

  const handleNoteInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNote(event.currentTarget.value);
  };

  const handleAmountInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setAmount(event.currentTarget.value);
  };

  let width = 36;
  if (amount) {
    // The width of a character is approx. 9 pixels
    width = Math.min(Math.max(36, amount.length * 9), 100);
  }

  return (
    <div className={styles.splitTransactionForm}>
      <div className={styles.description}>
        <CategorySelect placeholder={t('selectCategory')} />
        <ButtonInput
          className={styles.addNoteInput}
          formatLabel={(value, placeholder = '') => (value ? `*${value}` : placeholder)}
          onChange={handleNoteInputChange}
          placeholder={t('addNote')}
          value={note}
        />
      </div>
      <div className={styles.amount}>
        <label htmlFor="amount">$</label>
        <input
          id="amount"
          onChange={handleAmountInputChange}
          placeholder="0.00"
          style={{ width }}
          type="text"
        />
      </div>
      <Button>{t('save')}</Button>
    </div>
  );
};

export default SplitTransactionForm;
