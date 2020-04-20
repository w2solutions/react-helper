import React from 'react'
import { XAuthState } from './types';

export type InitFn = () => Promise<XAuthState['user']> | XAuthState['user'];
export type SignInFn = (
  username: string,
  password: string
) => (Promise<XAuthState['user']> | XAuthState['user'])
export type SignOutFn = () => Promise<void> | void;



export interface XAuthContextType {
  state: XAuthState;
  signIn: SignInFn;
  signOut: SignOutFn;
}

export const XAuthContext = React.createContext<XAuthContextType>(null as any);