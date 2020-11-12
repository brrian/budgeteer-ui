import React, { createContext, FC, useContext } from 'react';
import { ModalProps, ModalState } from '../../../components/Modal';

type ModalContextProviderProps = ModalState;

const ModalContext = createContext<ModalState | undefined>(undefined);

export const useModalState = <TProps extends ModalProps = undefined>(): ModalState<TProps> => {
  const context = useContext(ModalContext);

  if (context === undefined) {
    throw new Error('usModalState must be used within a ModalContextProvider');
  }

  return context as ModalState<TProps>;
};

export const ModalContextProvider: FC<ModalContextProviderProps> = ({
  children,
  ...modalProps
}) => {
  return <ModalContext.Provider value={modalProps}>{children}</ModalContext.Provider>;
};
