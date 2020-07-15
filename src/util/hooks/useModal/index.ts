import { useState } from 'react';
import { ModalState } from '../../../components/Modal';

export default function useModal(): ModalState {
  const [isVisible, setIsVisible] = useState(false);

  const closeModal = () => {
    setIsVisible(false);
  };

  const openModal = () => {
    setIsVisible(true);
  };

  return { closeModal, isVisible, openModal };
}
