import React from 'react'
import { EzAuthState } from './types';

export type InitFn = () => Promise<EzAuthState['user']> | EzAuthState['user'];
export type SignInFn = (
  username: string,
  password: string
) => (Promise<EzAuthState['user']> | EzAuthState['user'])
export type SignOutFn = () => Promise<void> | void;



export interface EzAuthContextType {
  state: EzAuthState;
  signIn: SignInFn;
  signOut: SignOutFn;
}

export const EzAuthContext = React.createContext<EzAuthContextType>(null as any);