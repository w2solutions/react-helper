import { DefaultUser } from ".";

export interface XAuthState {
  initialized: boolean;
  authenticated: boolean;
  user: DefaultUser | null;
}