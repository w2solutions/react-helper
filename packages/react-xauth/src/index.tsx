
export * from './hooks'
export * from './components'
export * from './XAuthContext'
export * from './types'

export interface DefaultUser {
  id: string;
  roles?: DefaultUserRole[];
}

export enum DefaultUserRole {
  ADMIN = 'Admin',
  USER = 'User',
}