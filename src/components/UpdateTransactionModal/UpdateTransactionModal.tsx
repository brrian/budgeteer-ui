import React, { FC, useMemo } from 'react';
import { useUserState } from '../../util/contexts/UserContext';
import { Transaction } from '../../util/helpers/api/models';
import useTranslation from '../../util/hooks/useTranslation';
import Modal, { ModalState } from '../Modal';
import Select from '../Select';
import Swipeable from '../Swipeable';
import SplitTransactionForm from './SplitTransactionForm';
import styles from './UpdateTransactionModal.module.scss';

interface UpdateTransactionModalProps extends ModalState {
  transaction: Transaction;
}

const UpdateTransactionModal: FC<UpdateTransactionModalProps> = ({
  transaction,
  ...modalProps
}) => {
  const { t } = useTranslation();

  const { categories } = useUserState();

  const categoryOptions = useMemo(() => Array.from(categories.values()), [categories]);

  const actions = useMemo(
    () => [
      {
        breakpoints: {
          min: 80,
          max: 150,
        },
        color: 'blue',
        id: 'split',
        label: t('split'),
        orientation: 'left',
      },
      {
        breakpoints: {
          min: 150,
          max: Infinity,
        },
        color: 'green',
        id: 'addNote',
        label: t('addNote'),
        orientation: 'left',
      },
      {
        breakpoints: {
          min: -150,
          max: -80,
        },
        color: 'purple',
        id: 'disable',
        label: t('disable'),
        orientation: 'right',
      },
      {
        breakpoints: {
          min: -Infinity,
          max: -150,
        },
        color: 'red',
        id: 'delete',
        label: t('delete'),
        orientation: 'right',
      },
    ],
    [t]
  );

  const handleAction = (action: string) => {
    window.alert(`do action: ${action}`);
  };

  const handleCategoryChange = (category: string) => {
    window.alert(`update category: ${category}`);
  };

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
          <>
            <Swipeable actions={actions} key={index} onAction={handleAction}>
              <div className={styles.transaction}>
                <div>
                  <Select
                    initialValue={`${item.categoryId}`}
                    onChange={handleCategoryChange}
                    options={categoryOptions}
                  />
                  {item.note && <p className={styles.note}>*{item.note}*</p>}
                </div>
                <span className={styles.amount}>${item.amount.toFixed(2)}</span>
              </div>
            </Swipeable>
            {index === 0 && <SplitTransactionForm />}
          </>
        ))}
      </div>
    </Modal>
  );
};

export default UpdateTransactionModal;
