import React, { FC, Fragment, useMemo, useState } from 'react';
import { Transaction } from '../../util/helpers/api/models';
import useTranslation from '../../util/hooks/useTranslation';
import CategorySelect from '../CategorySelect';
import Modal, { ModalState } from '../Modal';
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

  const [splitFormIndex, setSplitFormIndex] = useState<number>();

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

  const handleAction = (action: string, index: number) => {
    if (action === 'split') {
      setSplitFormIndex(index);
    } else {
      window.alert(`do action: ${action}`);
    }
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
          <Fragment key={index}>
            <Swipeable actions={actions} onAction={action => handleAction(action, index)}>
              <div className={styles.transaction}>
                <div>
                  <CategorySelect
                    defaultValue={`${item.categoryId}`}
                    onChange={handleCategoryChange}
                  />
                  {item.note && <p className={styles.note}>*{item.note}</p>}
                </div>
                <span className={styles.amount}>${item.amount.toFixed(2)}</span>
              </div>
            </Swipeable>
            {splitFormIndex === index && <SplitTransactionForm />}
          </Fragment>
        ))}
      </div>
    </Modal>
  );
};

export default UpdateTransactionModal;
