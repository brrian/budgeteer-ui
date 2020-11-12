import React, { FC } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { Transaction } from '../../util/helpers/api/models';
import useTranslation from '../../util/hooks/useTranslation';
import CategorySelect from '../CategorySelect';
import Form from '../Form';
import FormField from '../FormField';
import Modal, { ModalState } from '../Modal';
import calculateAmount from './util/calculateAmount';

type SplitTransactionModalProps = ModalState<{
  splitIndex?: number;
  transaction: Transaction;
}>;

interface FormValues {
  amount: string;
  category: string;
  disabled?: boolean;
  note?: string;
}

const SplitTransactionModal: FC<SplitTransactionModalProps> = props => {
  const { transaction } = props;

  const formProps = useForm<FormValues>({
    defaultValues: {
      category: '',
    },
  });

  const { t } = useTranslation(['common', 'validation']);

  const handleSubmit: SubmitHandler<FormValues> = _data => {
    // Handle submit
  };

  const errors = Object.entries(formProps.errors).map(([field, error]) => {
    return error?.message || t(`validation:${error?.type}`, { field: t(field) });
  });

  return (
    <Modal {...props}>
      <FormProvider {...formProps}>
        <Form
          errors={errors}
          heading={t('splitTransaction')}
          onCancel={props.closeModal}
          onSubmit={formProps.handleSubmit(handleSubmit)}
        >
          <FormField>
            <label>{t('description')}</label>
            <input type="text" readOnly value={transaction.description} />
          </FormField>
          <FormField>
            <label htmlFor="category-select">{t('category')}</label>
            <CategorySelect
              autoFocus
              id="category-select"
              name="category"
              placeholder={t('selectCategory')}
              ref={formProps.register({ required: true })}
            />
          </FormField>
          <FormField>
            <label htmlFor="amount-input">{t('amount')}</label>
            <input
              id="amount-input"
              name="amount"
              placeholder="0.00"
              ref={formProps.register({
                required: true,
                validate: value => (isNaN(calculateAmount(value)) ? t('invalidAmount') : true),
              })}
              type="text"
            />
          </FormField>
          <FormField>
            <label htmlFor="note-input">{t('note')}</label>
            <input id="note-input" name="note" ref={formProps.register} type="text" />
          </FormField>
          <FormField>
            <label>
              <input type="checkbox" name="disabled" ref={formProps.register} />
              {t('disabled')}
            </label>
          </FormField>
        </Form>
      </FormProvider>
    </Modal>
  );
};

export default SplitTransactionModal;
