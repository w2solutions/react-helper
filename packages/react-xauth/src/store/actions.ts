import * as types from './types';

import { XAuthState } from '..';

export type XAuthAction = InitializeAction | SetUserAction | ResetAction;

export type InitializeAction = ReturnType<typeof initialize>;
export const initialize = (user: XAuthState['user']) => ({
  type: types.INITIALIZE,
  payload: { user },
});

export type SetUserAction = ReturnType<typeof setUser>;
export const setUser = (user: XAuthState['user']) => ({
  type: types.SET_USER,
  payload: { user },
});

export type ResetAction = ReturnType<typeof reset>;
export const reset = () => ({
  type: types.RESET,
  payload: {},
});
