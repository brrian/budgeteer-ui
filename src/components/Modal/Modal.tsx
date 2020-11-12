import React, { FC, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { ModalContextProvider } from '../../util/contexts/ModalContext';
import styles from './Modal.module.scss';

interface ModalProps {
  closeModal: () => void;
  isVisible: boolean;
}

const Modal: FC<ModalProps> = ({ children, ...modalProps }) => {
  const { closeModal, isVisible } = modalProps;

  const portalRoot = document.getElementById('portal-root');

  if (!portalRoot) {
    throw new Error('#portal-root is not defined');
  }

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeModal();
      }
    };

    if (isVisible) {
      document.body.classList.add(styles.modalVisible);
      document.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.classList.remove(styles.modalVisible);
      document.removeEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.body.classList.remove(styles.modalVisible);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [closeModal, isVisible]);

  return isVisible
    ? createPortal(
        <ModalContextProvider {...modalProps}>
          <div className={styles.overlay} onClick={closeModal}>
            <div className={styles.modal} onClick={event => event.stopPropagation()}>
              {children}
            </div>
          </div>
        </ModalContextProvider>,
        portalRoot
      )
    : null;
};

export default Modal;
