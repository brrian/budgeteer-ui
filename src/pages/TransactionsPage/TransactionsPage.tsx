import React, { ChangeEvent, FC, lazy, Suspense, useCallback, useRef } from 'react';
import { animated, config, useSpring } from 'react-spring';
import BudgetCategories, { BudgetCategoriesPlaceholder } from '../../components/BudgetCategories';
import GenericErrorBoundary from '../../components/GenericErrorBoundary';
import Transactions, { TransactionsPlaceholder } from '../../components/Transactions';
import { Transaction } from '../../graphql/models';
import useUpdateTransactionMutation from '../../graphql/useUpdateTransactionMutation';
import { getTheme, setTheme } from '../../util/helpers/theme';
import useModal from '../../util/hooks/useModal';
import useTranslation from '../../util/hooks/useTranslation';
import { TransactionFormValues } from './TransactionModal';
import styles from './TransactionsPage.module.scss';
import applyTransactionUpdates from './util/applyTransactionUpdates';
import useMonthYearParams from './util/useMonthYearParams';

const DeleteModal = lazy(() => import('./DeleteModal'));
const TransactionModal = lazy(() => import('./TransactionModal'));

const COLLAPSED_HEIGHT = 40;
const EXPANDED_HEIGHT = 286;

type DeleteModalProps = {
  onDelete: () => void;
};

type TransactionModalProps = {
  defaultValues?: Partial<Transaction>;
  headingLabel: string;
  onSubmit: (data: TransactionFormValues) => void;
  submitLabel: string;
};

const TransactionsPage: FC = () => {
  const { t } = useTranslation();

  const { month, year } = useMonthYearParams();

  const [updateTransaction] = useUpdateTransactionMutation();

  const transactionModalProps = useModal<TransactionModalProps>();
  const deleteModalProps = useModal<DeleteModalProps>();

  const isExpanded = useRef(false);
  const longPressRef = useRef<number>();

  const [{ height }, set] = useSpring(() => ({
    config: config.stiff,
    height: COLLAPSED_HEIGHT,
  }));

  const handleTransactionAction = useCallback(
    (action: string, transaction: Transaction, splitIndex?: number) => {
      if (action === 'edit') {
        transactionModalProps.openModal({
          defaultValues: splitIndex === undefined ? transaction : transaction.splits[splitIndex],
          headingLabel: t('editTransaction'),
          onSubmit: data => {
            const updates = applyTransactionUpdates(transaction, splitIndex, data);

            updateTransaction(updates);

            transactionModalProps.closeModal();
          },
          submitLabel: t('save'),
        });
      } else if (action === 'split') {
        transactionModalProps.openModal({
          headingLabel: t('splitTransaction'),
          onSubmit: data => handleTransactionSplit(transaction, splitIndex ?? null, data),
          submitLabel: t('split'),
        });
      } else if (action === 'delete') {
        deleteModalProps.openModal({
          onDelete: () => handleTransactionDelete(transaction),
        });
      } else if (action === 'enable' || action === 'disable') {
        const updates = applyTransactionUpdates(transaction, splitIndex, {
          disabled: action === 'disable',
        });

        updateTransaction(updates);
      }
    },
    []
  );

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

  const handleThemeToggle = (event: ChangeEvent<HTMLInputElement>) => {
    const theme = event.currentTarget.checked ? 'dark' : 'light';

    setTheme(theme);
  };

  const handleTransactionDelete = (transaction: Transaction) => {
    // eslint-disable-next-line no-console
    console.log('delete transaction...', { transaction });
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

  return (
    <div className={styles.container}>
      <animated.div
        className={styles.budget}
        onDoubleClick={handleBudgetDoubleClick}
        onTouchEnd={handleBudgetTouchEnd}
        onTouchStart={handleBudgetTouchStart}
        style={{ height }}
      >
        <Suspense fallback={<BudgetCategoriesPlaceholder />}>
          <BudgetCategories month={month} year={year} />
        </Suspense>
      </animated.div>
      <animated.div className={styles.transactions} style={{ top: height }}>
        <GenericErrorBoundary>
          <Suspense fallback={<TransactionsPlaceholder />}>
            <Transactions month={month} onAction={handleTransactionAction} year={year} />
          </Suspense>
        </GenericErrorBoundary>
        <label className={styles.tempDarkModeContainer}>
          <input
            defaultChecked={getTheme() === 'dark'}
            onChange={handleThemeToggle}
            type="checkbox"
          />
          Dark mode
        </label>
      </animated.div>
      <Suspense fallback={null}>
        {transactionModalProps.isVisible && <TransactionModal {...transactionModalProps} />}
        {deleteModalProps.isVisible && <DeleteModal {...deleteModalProps} />}
      </Suspense>
    </div>
  );
};

export default TransactionsPage;
