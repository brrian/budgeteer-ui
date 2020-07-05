export interface Action {
  breakpoints: {
    min: number;
    max: number;
  };
  color: string;
  orientation: string;
  type: string;
}

const actions: Action[] = [
  {
    breakpoints: {
      min: 150,
      max: Infinity,
    },
    color: 'green',
    orientation: 'left',
    type: 'split',
  },
  {
    breakpoints: {
      min: 80,
      max: 150,
    },
    color: 'blue',
    orientation: 'left',
    type: 'edit',
  },
  {
    breakpoints: {
      min: -Infinity,
      max: -80,
    },
    color: 'red',
    orientation: 'right',
    type: 'disable',
  },
];

export default actions;
