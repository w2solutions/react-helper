import { EzAuthEvent } from '.';

interface Subscriber {
  unsubscribe: () => void;
}

type EzAuthEventListener = (event: EzAuthEvent) => void;
let listeners: EzAuthEventListener[] = [];

let emitAuthEvent = (event: EzAuthEvent) => {
  listeners.forEach(listener => listener(event))
}

const ezAuthEventHub = {
  subscribe: (cb: EzAuthEventListener): Subscriber => {
    listeners.push(cb);

    return {
      unsubscribe: () => {
        listeners = listeners.filter((listener) => listener !== cb);
      },
    };
  },
};

export { emitAuthEvent, ezAuthEventHub };
