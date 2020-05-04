import { useEffect, DependencyList, EffectCallback } from 'react';

export const useDebounceEffect = (
  fn: EffectCallback,
  delayMs: number,
  deps?: DependencyList
) => {
  useEffect(() => {
    let canceled = false
    const timeout = setTimeout(() => {
      canceled || fn()
    }, delayMs)

    return () => {
      canceled = true
      clearTimeout(timeout)
    }
  }, deps)
};
