import React, { FC } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { Transaction } from '../../util/helpers/api/models';
import useTranslation from '../../util/hooks/useTranslation';
import CategorySelect from '../CategorySelect';
import Form from '../Form';
import FormField from '../FormField';
import Modal, { ModalState } from '../Modal';
import calculateAmount from './util/calculateAmount';

type TransactionModalProps = ModalState<{
  defaultValues?: Partial<Transaction>;
  headingLabel: string;
  onSubmit: (data: TransactionFormValues) => void;
  submitLabel: string;
}>;

export interface TransactionFormValues {
  amount: string;
  category: string;
  disabled?: boolean;
  note?: string;
}

const TransactionModal: FC<TransactionModalProps> = ({
  defaultValues,
  headingLabel,
  submitLabel,
  onSubmit,
  ...modalProps
}) => {
  const formProps = useForm<TransactionFormValues>({
    defaultValues: {
      amount: defaultValues?.amount ? `${defaultValues.amount.toFixed(2)}` : undefined,
      category: defaultValues?.categoryId ?? '',
      disabled: defaultValues?.disabled,
      note: defaultValues?.note ?? undefined,
    },
  });

  const { t } = useTranslation(['common', 'validation']);

  const errors = Object.entries(formProps.errors).map(([field, error]) => {
    return error?.message || t(`validation:${error?.type}`, { field: t(field) });
  });

  return (
    <Modal {...modalProps}>
      <FormProvider {...formProps}>
        <Form
          errors={errors}
          heading={headingLabel}
          onSubmit={formProps.handleSubmit(onSubmit)}
          submitLabel={submitLabel}
        >
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

export default TransactionModal;
