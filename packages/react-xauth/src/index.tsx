import React, {
  useContext,
  useReducer,
  useEffect,
  useRef,
  useCallback,
} from 'react';

import authReducer from './store/reducer';
import { initialize, setUser, reset } from './store/actions';

export interface DefaultUser {
  id: string;
  roles?: DefaultUserRole[];
}

export enum DefaultUserRole {
  ADMIN = 'Admin',
  USER = 'User',
}

export interface XAuthState {
  initialized: boolean;
  authenticated: boolean;
  user: DefaultUser | null;
}

export interface XAuthContextType {
  state: XAuthState;
  signIn: SignInFn;
  signOut: SignOutFn;
}

export const AuthContext = React.createContext<XAuthContextType>(null as any);

export const useXAuth = () => {
  const { state, ...rest } = useContext(AuthContext);

  return [state, rest] as [typeof state, typeof rest];
};

const initialAuthState: XAuthContextType['state'] = {
  initialized: false,
  authenticated: true,
  user: null,
};

type InitFn = () => Promise<XAuthState['user']> | XAuthState['user'];
type SignInFn = (
  username: string,
  password: string
) => Promise<XAuthState['user']> | XAuthState['user'];
type SignOutFn = () => Promise<void> | void;

interface XAuthProviderProps {
  init?: InitFn;
  signIn?: SignInFn;
  signOut?: SignOutFn;
}

export const XAuthProvider: React.FC<XAuthProviderProps> = (props) => {
  const [state, dispatch] = useReducer(authReducer, initialAuthState);

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
    <AuthContext.Provider value={{ state, signIn, signOut }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export {};
