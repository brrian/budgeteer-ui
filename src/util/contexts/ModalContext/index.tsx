import React, { createContext, FC, useContext } from 'react';
import { ModalState } from '../../../components/Modal';

type ModalContextProviderProps = ModalState;

const ModalContext = createContext<ModalState | undefined>(undefined);

export const useModalState = (): ModalState => {
  const context = useContext(ModalContext);

  if (context === undefined) {
    throw new Error('usModalState must be used within a UserModalContextProvider');
  }

  return context;
};

export const ModalContextProvider: FC<ModalContextProviderProps> = ({
  children,
  ...modalProps
}) => {
  return <ModalContext.Provider value={modalProps}>{children}</ModalContext.Provider>;
};
