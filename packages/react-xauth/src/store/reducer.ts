import { XAuthActionType } from './types';
import { XAuthAction } from './actions';
import { XAuthState } from '../types';

const setCalculatedFields = (state: XAuthState): XAuthState => ({
  ...state,
  authenticated: !!state.user,
});

const xauthReducer = (state: XAuthState, action: XAuthAction): XAuthState => {
  switch (action.type) {
    case XAuthActionType.INITIALIZE:
      return setCalculatedFields({
        ...state,
        initialized: true,
        user: action.payload.user,
      });
    case XAuthActionType.SET_USER:
      return setCalculatedFields({
        ...state,
        user: action.payload.user,
      });
    case XAuthActionType.RESET:
      return setCalculatedFields({
        ...state,
        user: null,
      });
    default:
      return state;
  }
};

export default xauthReducer;
