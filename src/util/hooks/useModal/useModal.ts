import { useState } from 'react';

type ModalProps = Record<string, unknown> | undefined;

interface UseModalBase<TProps extends ModalProps> {
  closeModal: () => void;
  isVisible: boolean;
  openModal: TProps extends undefined ? () => void : (props: TProps) => void;
}

type UseModal<TProps extends ModalProps = undefined> = TProps extends undefined
  ? UseModalBase<TProps>
  : TProps & UseModalBase<TProps>;

interface ModalState<TProps extends ModalProps> {
  isVisible: boolean;
  props: TProps;
}

export default function useModal<TProps extends ModalProps = undefined>(): UseModal<TProps> {
  const [modalState, setModalState] = useState({ isVisible: false } as ModalState<TProps>);

  const closeModal = () => {
    setModalState({ isVisible: false } as ModalState<TProps>);
  };

  const openModal = (props: TProps) => {
    setModalState({ isVisible: true, props });
  };

  return {
    closeModal,
    isVisible: modalState.isVisible,
    openModal,
    ...modalState.props,
  } as UseModal<TProps>;
}
