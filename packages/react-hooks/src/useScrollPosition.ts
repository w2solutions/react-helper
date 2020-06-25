import { useState, useLayoutEffect } from 'react';

interface Position {
  x: number;
  y: number;
}

interface UseScrollPositionOptions {
  throttle: number;
}

const defaultOptions: UseScrollPositionOptions = {
  throttle: 100,
};

export const useScrollPosition = (
  options: Partial<UseScrollPositionOptions> = {}
): Position => {
  const conf = { ...defaultOptions, ...options };
  let [position, setPosition] = useState(getWindowScrollPosition());

  useLayoutEffect(() => {
    let timeout: NodeJS.Timeout;
    const handler = () => {
      if (timeout) {
        clearTimeout(timeout);
      }
      timeout = setTimeout(
        () => setPosition(getWindowScrollPosition()),
        conf.throttle
      );
    };

    window.addEventListener('scroll', handler);
    return () => {
      clearTimeout(timeout);
      window.removeEventListener('scroll', handler);
    };
  }, []);

  return position;
};

const getWindowScrollPosition = (): Position => ({
  x: window.pageXOffset,
  y: window.pageYOffset,
});
