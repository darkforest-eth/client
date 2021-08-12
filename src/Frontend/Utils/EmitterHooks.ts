import { Callback, Monomitter } from '@darkforest_eth/events';
import { useEffect, useState } from 'react';
import { Wrapper } from '../../Backend/Utils/Wrapper';

/**
 * Execute something on emitter callback
 * @param emitter `Monomitter` to subscribe to
 * @param callback callback to subscribe
 */
export function useEmitterSubscribe<T>(emitter: Monomitter<T>, callback: Callback<T>) {
  useEffect(() => {
    return emitter.subscribe(callback).unsubscribe;
  }, [emitter, callback]);
}

/**
 * Use returned value from an emitter
 * @param emitter `Monomitter` to subscribe to
 * @param initialVal initial state value
 */
export function useEmitterValue<T>(emitter: Monomitter<T>, initialVal: T) {
  const [val, setVal] = useState<T>(initialVal);

  useEffect(() => {
    const sub = emitter.subscribe((v) => setVal(v));

    return sub.unsubscribe;
  }, [emitter]);

  return val;
}

/**
 * Use returned value from an emitter, and clone the reference - used to force an update to the UI
 * @param emitter `Monomitter` to subscribe to
 * @param initialVal initial state value
 */
export function useWrappedEmitter<T>(
  emitter: Monomitter<T | undefined>,
  initialVal: T | undefined
): Wrapper<T | undefined> {
  const [val, setVal] = useState<Wrapper<T | undefined>>(new Wrapper(initialVal));

  useEffect(() => {
    const sub = emitter.subscribe((v) => {
      setVal(new Wrapper(v));
    });

    return sub.unsubscribe;
  }, [emitter]);

  return val;
}
