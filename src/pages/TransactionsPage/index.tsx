import React, { ChangeEvent, FC, useRef } from 'react';
import { animated, config, useSpring } from 'react-spring';
import BudgetCategories from '../../components/BudgetCategories';
import Transactions from '../../components/Transactions';
import { getTheme, setTheme } from '../../util/helpers/theme';
import useAuth from '../../util/hooks/useAuth';
import mockTransactions from './mockTransactions';
import styles from './styles.module.scss';

const COLLAPSED_HEIGHT = 40;
const EXPANDED_HEIGHT = 286;

const TransactionsPage: FC = () => {
  const auth = useAuth();

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
          <Transactions transactions={mockTransactions} />
          <label className={styles.tempDarkModeContainer}>
            <input
              defaultChecked={getTheme() === 'dark'}
              onChange={handleThemeToggle}
              type="checkbox"
            />
            Dark mode
          </label>
        </>
      </animated.div>
    </div>
  );
};

export default TransactionsPage;
