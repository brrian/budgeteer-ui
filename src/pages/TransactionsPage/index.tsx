import React, { FC, useRef } from 'react';
import { animated, config, useSpring } from 'react-spring';
import BudgetCategories from '../../components/BudgetCategories';
import Transaction from '../../components/Transaction';
import useAuth from '../../util/hooks/useAuth';
import mockTransactions from './mockTransactions';
import styles from './styles.module.scss';

const COLLAPSED_HEIGHT = 40;
const EXPANDED_HEIGHT = 286;

const TransactionsPage: FC = () => {
  const auth = useAuth();

  const isExpanded = useRef(false);

  const [{ height }, set] = useSpring(() => ({
    config: config.stiff,
    height: COLLAPSED_HEIGHT,
  }));

  const handleExpandClick = () => {
    const newValue = isExpanded.current ? COLLAPSED_HEIGHT : EXPANDED_HEIGHT;

    set({ height: newValue });

    isExpanded.current = !isExpanded.current;
  };

  return auth.isReady ? (
    <div className={styles.container}>
      <animated.div className={styles.budget} onDoubleClick={handleExpandClick} style={{ height }}>
        <BudgetCategories />
      </animated.div>
      <animated.div className={styles.transactions} style={{ top: height }}>
        {mockTransactions.map((transaction, index) => (
          <Transaction {...transaction} key={index} />
        ))}
      </animated.div>
    </div>
  ) : (
    <div>Loading...</div>
  );
};

export default TransactionsPage;
