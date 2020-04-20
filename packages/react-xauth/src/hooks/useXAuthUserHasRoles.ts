import { useXAuth } from "./useXAuth"
import { DefaultUserRole } from ".."

export const useXAuthUserHasRoles = (roles: DefaultUserRole | DefaultUserRole[]) => {
  const [state] = useXAuth()
  if (!state.initialized) {
    return false
  }
  if (!state.authenticated) {
    return false
  }
  if (!state.user.roles) {
    console.warn('using useXUserHasRoles though user object has no roles set')
    return false
  }

  if (!Array.isArray(state.user.roles)) {
    throw new Error('roles attribute must be an array')
  }

  const roleArray = Array.isArray(roles) ? roles : [roles]
  const userHasRole = roleArray.some(role => state.user.roles.indexOf(role) >= 0)
  return userHasRole
}
