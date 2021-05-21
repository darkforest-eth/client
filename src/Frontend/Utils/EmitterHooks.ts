import _ from 'lodash';
import { useEffect, useState } from 'react';
import { Wrapper } from '../../Backend/Utils/Wrapper';
import { Monomitter, Callback } from './Monomitter';

/**
 * Execute something on emitter callback
 * @param emitter `Monomitter` to subscribe to
 * @param callback callback to subscribe
 */
export function useEmitterSubscribe<T>(emitter: Monomitter<T>, callback: Callback<T>) {
  useEffect(() => {
    const sub = emitter.subscribe(callback);

    return sub.unsubscribe;
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

/**
 * Return a bool indicating if a key is pressed
 * @param keydown$ keydown monomitter
 * @param keyup$ keyup monomitter
 */
export function useKeyPressed(
  keydown$: Monomitter<KeyboardEvent>,
  keyup$: Monomitter<KeyboardEvent>
): boolean {
  const [pressed, setPressed] = useState<boolean>(false);

  useEffect(() => {
    const downSub = keydown$.subscribe((_e) => setPressed(true));
    const upSub = keyup$.subscribe((_e) => setPressed(false));

    return () => {
      downSub.unsubscribe();
      upSub.unsubscribe();
    };
  }, [keydown$, keyup$]);

  return pressed;
}
