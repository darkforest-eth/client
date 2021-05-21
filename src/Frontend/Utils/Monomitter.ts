/**
 * Typed single pub / sub pattern, inspired by:
 * https://github.com/loilo/monomitter/blob/master/monomitter.mjs
 */

export type Callback<T> = (o: T) => void;

export type Subscription = {
  unsubscribe: () => void;
};

export type Monomitter<T> = {
  publish: (o: T) => void;
  subscribe: (cb: Callback<T>) => Subscription;
  clear: () => void;
};

/**
 * Constructs a new event emitter, whose purpose is to emit values of the given type.
 *
 * @param emitLatestOnSubscribe - if this is true, upon subscription immediately emit
 *                                the most recently set value, if there is one
 */
export function monomitter<T>(emitLatestOnSubscribe = false): Monomitter<T> {
  const callbacks = new Set<Callback<T>>();
  let valueBeenSet = false;
  let latestValue: T | undefined = undefined;

  function publish(value: T) {
    valueBeenSet = true;
    latestValue = value;
    callbacks.forEach((callback) => callback(value));
  }

  function subscribe(callback: (value: T) => void) {
    callbacks.add(callback);

    if (emitLatestOnSubscribe && valueBeenSet) {
      callback(latestValue as T);
    }

    return { unsubscribe: () => callbacks.delete(callback) };
  }

  function clear() {
    callbacks.clear();
  }

  return {
    publish,
    subscribe,
    clear,
  };
}
