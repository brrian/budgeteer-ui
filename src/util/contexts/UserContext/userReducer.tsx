import { Reducer } from 'react';
import mockCategories from './mockCategories';
import { UserActions, UserState } from './models';

const userReducer: Reducer<UserState, UserActions> = (state, action) => {
  switch (action.type) {
    case 'setGroup': {
      return {
        ...state,
        categories: mockCategories,
        group: action.payload,
        isAuthenticated: true,
        isComplete: true,
      };
    }
    case 'setUser': {
      return {
        ...state,
        group: undefined,
        isAuthenticated: false,
        isComplete: false,
        user: action.payload,
      };
    }
    case 'unsetUser': {
      return {
        ...state,
        group: undefined,
        isAuthenticated: false,
        isComplete: true,
        user: undefined,
      };
    }
    default:
      return state;
  }
};

export default userReducer;
