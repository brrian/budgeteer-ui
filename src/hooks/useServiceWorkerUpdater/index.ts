import { useEffect } from 'react';
import useTranslation from '../useTranslation';

export default function useServiceWorkerUpdater(): void {
  const { t } = useTranslation();

  useEffect(() => {
    const handleWindowMessage = (message: MessageEvent) => {
      if (message.data === 'updateAvailable') {
        const shouldUpdate = window.confirm(t('updateAvailable'));

        if (shouldUpdate) {
          updateServiceWorker();
        }
      }
    };

    const updateServiceWorker = () => {
      if (navigator.serviceWorker) {
        navigator.serviceWorker.getRegistration().then(registration => {
          if (!registration || !registration.waiting) {
            return;
          }

          registration.waiting.postMessage('skipWaiting');
        });
      }
    };

    window.addEventListener('message', handleWindowMessage);

    return () => {
      window.removeEventListener('message', handleWindowMessage);
    };
  }, [t]);
}
