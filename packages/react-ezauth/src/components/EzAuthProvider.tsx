import React, { useReducer, useRef, useEffect, useCallback } from 'react'

;
import { InitFn, SignInFn, SignOutFn, EzAuthContextType, EzAuthContext } from '../EzAuthContext';
import ezAuthReducer from '../store/reducer';
import { initialize, setUser, reset } from '../store/actions';

interface EzAuthProviderProps {
  init?: InitFn;
  signIn?: SignInFn;
  signOut?: SignOutFn;
}


const initialAuthState: EzAuthContextType['state'] = {
  initialized: false,
  authenticated: true,
  user: null,
};

export const EzAuthProvider: React.FC<EzAuthProviderProps> = (props) => {
  const [state, dispatch] = useReducer(ezAuthReducer, initialAuthState);

  const functionRef = useRef({
    init: props.init || (() => null),
  });

  useEffect(() => {
    const init = async () => {
      const user = await functionRef.current.init();
      dispatch(initialize(user));
    };
    init();
  }, []);

  const signIn = useCallback(
    async (username: string, password: string) => {
      const fn = props.signIn || (() => null);
      const user = await fn(username, password);
      dispatch(setUser(user));
      return user;
    },
    [props.signIn, dispatch]
  );

  const signOut = useCallback(async () => {
    const fn = props.signOut || (() => null);
    await fn();
    dispatch(reset());
  }, [props.signOut, dispatch]);

  return (
    <EzAuthContext.Provider value={{ state, signIn, signOut }}>
      {props.children}
    </EzAuthContext.Provider>
  );
};