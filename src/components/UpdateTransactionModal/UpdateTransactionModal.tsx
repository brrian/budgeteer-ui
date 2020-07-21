import React, { FC } from 'react';
import { useUserState } from '../../util/contexts/UserContext';
import { Transaction } from '../../util/helpers/api/models';
import useTranslation from '../../util/hooks/useTranslation';
import Button from '../Button';
import Modal, { ModalState } from '../Modal';
import styles from './styles.module.scss';

interface UpdateTransactionModalProps extends ModalState {
  transaction: Transaction;
}

const UpdateTransactionModal: FC<UpdateTransactionModalProps> = ({
  transaction,
  ...modalProps
}) => {
  const { t } = useTranslation();

  const { categories } = useUserState();

  const transactions = [
    {
      amount: transaction.amount,
      categoryId: transaction.categoryId,
      disabled: transaction.disabled,
      note: transaction.note,
    },
    ...transaction.splits,
  ];

  return (
    <Modal {...modalProps}>
      <p>{transaction.description}</p>
      <div className={styles.transactions}>
        {transactions.map((item, index) => (
          <div className={styles.transaction} key={index}>
            <Button isLink>{categories[item.categoryId]}</Button>
            <Button isLink>${item.amount.toFixed(2)}</Button>
          </div>
        ))}
      </div>
      <Button isLink>{t('addSplit')}</Button>
    </Modal>
  );
};

export default UpdateTransactionModal;
