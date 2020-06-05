import React, { CSSProperties } from 'react';
import { useEzAuth, DefaultUserRole } from '..';
import { useEzAuthUserHasRoles } from '../hooks';

interface EzAuthRequiredProps {
  fallback?: React.ReactNode;
  roles?: DefaultUserRole | DefaultUserRole[]
  children: React.ReactNode;
  className?: string;
  style?: CSSProperties;
}

export const EzAuthRequired: React.FC<EzAuthRequiredProps> = (props) => {
  const [state] = useEzAuth();

  const hasRole = useEzAuthUserHasRoles(props.roles ?? [])

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

export default EzAuthRequired;


