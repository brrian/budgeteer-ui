import { useMemo } from 'react';
import { Action } from '../../Swipeable/Swipeable';

export default function useTransactionActions(disabled: boolean): Action[] {
  return useMemo(
    () => [
      {
        breakpoints: {
          min: 80,
          max: 150,
        },
        color: 'blue',
        id: 'split',
        labelKey: 'split',
        orientation: 'left',
      },
      {
        breakpoints: {
          min: 150,
          max: Infinity,
        },
        color: 'green',
        id: 'edit',
        labelKey: 'edit',
        orientation: 'left',
      },
      {
        breakpoints: {
          min: -150,
          max: -80,
        },
        color: 'purple',
        id: !disabled ? 'disable' : 'enable',
        labelKey: !disabled ? 'disable' : 'enable',
        orientation: 'right',
      },
      {
        breakpoints: {
          min: -Infinity,
          max: -150,
        },
        color: 'red',
        id: 'delete',
        labelKey: 'delete',
        orientation: 'right',
      },
    ],
    [disabled]
  );
}
