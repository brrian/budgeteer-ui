import { CognitoUser } from '@aws-amplify/auth';
import { Categories, FetchGroupResponse as Group } from '../../helpers/api/models';

export interface UserState {
  categories: Categories;
  group?: Group;
  isAuthenticated: boolean;
  isComplete: boolean;
  user?: CognitoUser;
}

export type UserActions = SetGroupAction | SetUserAction | UnsetUserAction;

type SetGroupAction = ActionType<'setGroup', Group>;

type SetUserAction = ActionType<'setUser', CognitoUser>;

type UnsetUserAction = ActionType<'unsetUser'>;

type ActionType<TType extends string, TPayload = undefined> = TPayload extends undefined
  ? {
      type: TType;
    }
  : {
      type: TType;
      payload: TPayload;
    };
