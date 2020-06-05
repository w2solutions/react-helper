import { DefaultUser } from ".";

export interface EzAuthState {
  initialized: boolean;
  authenticated: boolean;
  user: DefaultUser | null;
}