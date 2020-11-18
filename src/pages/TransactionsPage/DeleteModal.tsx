import React, { FC } from 'react';
import Button from '../../components/Button';
import Card from '../../components/Card';
import Modal, { ModalState } from '../../components/Modal';
import useTranslation from '../../util/hooks/useTranslation';

type DeleteModalProps = ModalState<{
  onDelete: () => void;
}>;

const DeleteModal: FC<DeleteModalProps> = ({ onDelete, ...modalProps }) => {
  const { t } = useTranslation();

  return (
    <Modal {...modalProps}>
      <Card
        Buttons={<Button onClick={onDelete}>{t('delete')}</Button>}
        heading={t('confirmDelete')}
      >
        {t('deleteConfirmation')}
      </Card>
    </Modal>
  );
};

export default DeleteModal;
