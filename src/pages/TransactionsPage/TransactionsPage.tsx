import React, { ChangeEvent, FC, useRef, useState } from 'react';
import { animated, config, useSpring } from 'react-spring';
import BudgetCategories from '../../components/BudgetCategories';
import Transactions from '../../components/Transactions';
import UpdateTransactionModal from '../../components/UpdateTransactionModal';
import { Transaction } from '../../util/helpers/api/models';
import { getTheme, setTheme } from '../../util/helpers/theme';
import useAuth from '../../util/hooks/useAuth';
import useModal from '../../util/hooks/useModal';
import mockTransactions from './mockTransactions';
import styles from './TransactionsPage.module.scss';

const COLLAPSED_HEIGHT = 40;
const EXPANDED_HEIGHT = 286;

const TransactionsPage: FC = () => {
  const auth = useAuth();

  const modalProps = useModal();

  const isExpanded = useRef(false);
  const longPressRef = useRef<number>();

  const [selectedTransaction, setSelectedTransaction] = useState<Transaction>();

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

  const handleTransactionSelect = (index: number) => {
    setSelectedTransaction(mockTransactions[index]);

    modalProps.openModal();
  };

  const handleThemeToggle = (event: ChangeEvent<HTMLInputElement>) => {
    const theme = event.currentTarget.checked ? 'dark' : 'light';

    setTheme(theme);
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
            onSelect={handleTransactionSelect}
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
      {selectedTransaction && (
        <UpdateTransactionModal {...modalProps} transaction={selectedTransaction} />
      )}
    </div>
  );
};

export default TransactionsPage;
