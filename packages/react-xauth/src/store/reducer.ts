import * as types from './types';
import { XAuthState } from '..';
import { XAuthAction, InitializeAction, SetUserAction } from './actions';

const setCalculatedFields = (state: XAuthState): XAuthState => ({
  ...state,
  authenticated: !!state.user,
});

const reducer = (state: XAuthState, action: XAuthAction): XAuthState => {
  switch (action.type) {
    case types.INITIALIZE:
      return setCalculatedFields({
        ...state,
        initialized: true,
        user: (action as InitializeAction).payload.user,
      });
    case types.SET_USER:
      return setCalculatedFields({
        ...state,
        user: (action as SetUserAction).payload.user,
      });
    case types.RESET:
      return setCalculatedFields({
        ...state,
        user: null,
      });
    default:
      return state;
  }
};

export default reducer;
