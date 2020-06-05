import { EzAuthActionType } from './types';
import { EzAuthState } from '../types';

export type EzAuthAction = InitializeAction | SetUserAction | ResetAction;

export type InitializeAction = ReturnType<typeof initialize>;
export const initialize = (user: EzAuthState['user']) => ({
  type: EzAuthActionType.INITIALIZE as EzAuthActionType.INITIALIZE,
  payload: { user },
});

export type SetUserAction = ReturnType<typeof setUser>;
export const setUser = (user: EzAuthState['user']) => ({
  type: EzAuthActionType.SET_USER as EzAuthActionType.SET_USER,
  payload: { user },
});

export type ResetAction = ReturnType<typeof reset>;
export const reset = () => ({
  type: EzAuthActionType.RESET as EzAuthActionType.RESET,
  payload: {},
});
