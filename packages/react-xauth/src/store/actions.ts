import { XAuthActionType } from './types';
import { XAuthState } from '../types';

export type XAuthAction = InitializeAction | SetUserAction | ResetAction;

export type InitializeAction = ReturnType<typeof initialize>;
export const initialize = (user: XAuthState['user']) => ({
  type: XAuthActionType.INITIALIZE as XAuthActionType.INITIALIZE,
  payload: { user },
});

export type SetUserAction = ReturnType<typeof setUser>;
export const setUser = (user: XAuthState['user']) => ({
  type: XAuthActionType.SET_USER as XAuthActionType.SET_USER,
  payload: { user },
});

export type ResetAction = ReturnType<typeof reset>;
export const reset = () => ({
  type: XAuthActionType.RESET as XAuthActionType.RESET,
  payload: {},
});
