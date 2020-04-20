import React, { CSSProperties } from 'react';
import { useXAuth } from '..';

interface XAuthRequiredProps {
  fallback?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  style?: CSSProperties;
}

export const XAuthRequired: React.FC<XAuthRequiredProps> = (props) => {
  const [state] = useXAuth();

  if (!state.initialized) {
    return null;
  }

  if (!state.authenticated) {
    return <>{props.fallback ?? null}</>;
  }

  return <>{props.children ?? null}</>;
};

export default XAuthRequired;
