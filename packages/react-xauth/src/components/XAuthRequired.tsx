import React, { CSSProperties } from 'react';
import { useXAuth, DefaultUserRole } from '..';
import { useXAuthUserHasRoles } from '../hooks';

interface XAuthRequiredProps {
  fallback?: React.ReactNode;
  roles?: DefaultUserRole | DefaultUserRole[]
  children: React.ReactNode;
  className?: string;
  style?: CSSProperties;
}

export const XAuthRequired: React.FC<XAuthRequiredProps> = (props) => {
  const [state] = useXAuth();

  const hasRole = useXAuthUserHasRoles(props.roles ?? [])

  if (!state.initialized) {
    return null;
  }

  if (!state.authenticated) {
    return <>{props.fallback ?? null}</>;
  }

  if (props.roles && !hasRole) {
    return <>{props.fallback ?? null}</>;
  }
  return <>{props.children ?? null}</>;
};

export default XAuthRequired;


