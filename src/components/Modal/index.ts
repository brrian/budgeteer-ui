export { default } from './Modal';

export type ModalProps = Record<string, unknown> | undefined;

export type ModalState<TProps extends ModalProps = undefined> = TProps extends undefined
  ? ModalStateBase
  : TProps & ModalStateBase;

interface ModalStateBase {
  closeModal: () => void;
  isVisible: boolean;
}
