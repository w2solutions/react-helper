
export enum XAuthActionType {
  INITIALIZE = 'XAUTH/initialize',
  RESET = 'XAUTH/reset',
  SET_USER = 'XAUTH/set_user'
}


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