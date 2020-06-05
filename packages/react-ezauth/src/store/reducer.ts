import { EzAuthActionType } from './types';
import { EzAuthAction } from './actions';
import { EzAuthState } from '../types';

const setCalculatedFields = (state: EzAuthState): EzAuthState => ({
  ...state,
  authenticated: !!state.user,
});

const ezAuthReducer = (state: EzAuthState, action: EzAuthAction): EzAuthState => {
  switch (action.type) {
    case EzAuthActionType.INITIALIZE:
      return setCalculatedFields({
        ...state,
        initialized: true,
        user: action.payload.user,
      });
    case EzAuthActionType.SET_USER:
      return setCalculatedFields({
        ...state,
        user: action.payload.user,
      });
    case EzAuthActionType.RESET:
      return setCalculatedFields({
        ...state,
        user: null,
      });
    default:
      return state;
  }
};

export default ezAuthReducer;
