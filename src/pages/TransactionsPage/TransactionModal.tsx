import React, { FC } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import CategorySelect from '../../components/CategorySelect';
import Form from '../../components/Form';
import FormField from '../../components/FormField';
import Modal, { ModalState } from '../../components/Modal';
import { Transaction } from '../../graphql/models';
import useTranslation from '../../util/hooks/useTranslation';
import calculateAmount from './util/calculateAmount';

type TransactionModalProps = ModalState<{
  defaultValues?: Partial<Transaction>;
  headingLabel: string;
  maxAmount?: number;
  onSubmit: (data: TransactionFormValues) => void;
  submitLabel: string;
}>;

export interface TransactionFormValues {
  amount: number;
  categoryId: string;
  disabled: boolean;
  note: string;
}

const TransactionModal: FC<TransactionModalProps> = ({
  defaultValues,
  headingLabel,
  maxAmount,
  onSubmit,
  submitLabel,
  ...modalProps
}) => {
  const formProps = useForm<TransactionFormValues>({
    defaultValues: {
      amount: defaultValues?.amount,
      categoryId: defaultValues?.categoryId ?? '',
      disabled: defaultValues?.disabled ?? false,
      note: defaultValues?.note ?? '',
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
              name="categoryId"
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
                setValueAs: (value: string) => calculateAmount(value),
                required: true,
                validate: (value: number) => {
                  if (isNaN(value)) {
                    return t('invalidAmount');
                  } else if (!!maxAmount && value >= maxAmount) {
                    return t('maxAmount', { value: `${maxAmount.toFixed(2)}` });
                  }

                  return true;
                },
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
