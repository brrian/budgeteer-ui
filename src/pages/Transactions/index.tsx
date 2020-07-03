import React, { FC } from 'react';
import useAuth from '../../util/hooks/useAuth';

const TransactionsPage: FC = () => {
  const auth = useAuth();

  return auth.isReady ? (
    <>
      <div>Transactions</div>
      <pre>{JSON.stringify(auth.group.name)}</pre>
    </>
  ) : (
    <div>Loading...</div>
  );
};

export default TransactionsPage;
