import React, { ChangeEvent, FC, useRef } from 'react';
import { animated, config, useSpring } from 'react-spring';
import BudgetCategories from '../../components/BudgetCategories';
import TransactionModal, { TransactionFormValues } from '../../components/TransactionModal';
import Transactions from '../../components/Transactions';
import { Transaction } from '../../util/helpers/api/models';
import { getTheme, setTheme } from '../../util/helpers/theme';
import useAuth from '../../util/hooks/useAuth';
import useModal from '../../util/hooks/useModal';
import useTranslation from '../../util/hooks/useTranslation';
import mockTransactions from './mockTransactions';
import styles from './TransactionsPage.module.scss';

const COLLAPSED_HEIGHT = 40;
const EXPANDED_HEIGHT = 286;

type ModalProps = {
  defaultValues?: Partial<Transaction>;
  headingLabel: string;
  onSubmit: (data: TransactionFormValues) => void;
  submitLabel: string;
};

const TransactionsPage: FC = () => {
  const auth = useAuth();

  const { t } = useTranslation();

  const modalProps = useModal<ModalProps>();

  const isExpanded = useRef(false);
  const longPressRef = useRef<number>();

  const [{ height }, set] = useSpring(() => ({
    config: config.stiff,
    height: COLLAPSED_HEIGHT,
  }));

  const handleBudgetDoubleClick = () => {
    toggleBudgetMenu();
  };

  const handleBudgetTouchStart = () => {
    longPressRef.current = window.setTimeout(() => {
      toggleBudgetMenu();
    }, 300);
  };

  const handleBudgetTouchEnd = () => {
    if (longPressRef.current) {
      window.clearTimeout(longPressRef.current);
    }
  };

  const toggleBudgetMenu = () => {
    const newValue = isExpanded.current ? COLLAPSED_HEIGHT : EXPANDED_HEIGHT;

    set({ height: newValue });

    navigator.vibrate?.(70);

    isExpanded.current = !isExpanded.current;
  };

  const handleTransactionAction = (
    action: string,
    transactionIndex: number,
    splitIndex?: number
  ) => {
    const transaction = mockTransactions[transactionIndex];

    if (action === 'edit') {
      modalProps.openModal({
        defaultValues: transaction,
        headingLabel: t('editTransaction'),
        onSubmit: data => handleTransactionUpdate(transaction, data),
        submitLabel: t('save'),
      });
    } else if (action === 'split') {
      modalProps.openModal({
        headingLabel: t('splitTransaction'),
        onSubmit: data => handleTransactionSplit(transaction, splitIndex ?? null, data),
        submitLabel: t('split'),
      });
    }
  };

  const handleThemeToggle = (event: ChangeEvent<HTMLInputElement>) => {
    const theme = event.currentTarget.checked ? 'dark' : 'light';

    setTheme(theme);
  };

  const handleTransactionSplit = (
    transaction: Transaction,
    splitIndex: number | null,
    data: TransactionFormValues
  ) => {
    // eslint-disable-next-line no-console
    console.log('split transaction...', {
      transaction,
      splitIndex,
      data,
    });
  };

  const handleTransactionUpdate = (transaction: Transaction, data: TransactionFormValues) => {
    // eslint-disable-next-line no-console
    console.log('update transaction...', {
      transaction,
      data,
    });
  };

  return (
    <div className={styles.container}>
      <animated.div
        className={styles.budget}
        onDoubleClick={handleBudgetDoubleClick}
        onTouchEnd={handleBudgetTouchEnd}
        onTouchStart={handleBudgetTouchStart}
        style={{ height }}
      >
        <BudgetCategories categories={auth.isReady ? [] : undefined} />
      </animated.div>
      <animated.div className={styles.transactions} style={{ top: height }}>
        <>
          <Transactions
            onAction={handleTransactionAction}
            transactions={auth.isReady ? mockTransactions : undefined}
          />
          {auth.isReady && (
            <label className={styles.tempDarkModeContainer}>
              <input
                defaultChecked={getTheme() === 'dark'}
                onChange={handleThemeToggle}
                type="checkbox"
              />
              Dark mode
            </label>
          )}
        </>
      </animated.div>
      {modalProps.isVisible && <TransactionModal {...modalProps} />}
    </div>
  );
};

export default TransactionsPage;
