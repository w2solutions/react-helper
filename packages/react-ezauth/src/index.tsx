
export * from './hooks'
export * from './components'
export * from './events'
export * from './EzAuthContext'
export * from './types'

export interface DefaultUser {
  id: string;
  roles?: DefaultUserRole[];
}

export enum DefaultUserRole {
  ADMIN = 'Admin',
  USER = 'User',
}