import React, { FC } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import useTranslation from '../../util/hooks/useTranslation';
import Button from '../Button';

const GenericErrorBoundary: FC = ({ children }) => {
  const { t } = useTranslation();

  return (
    <ErrorBoundary
      fallbackRender={({ resetErrorBoundary }) => (
        <div>
          {t('somethingWentWrong')}{' '}
          <Button isLink onClick={resetErrorBoundary}>
            {t('tryAgain')}
          </Button>
        </div>
      )}
    >
      {children}
    </ErrorBoundary>
  );
};

export default GenericErrorBoundary;
