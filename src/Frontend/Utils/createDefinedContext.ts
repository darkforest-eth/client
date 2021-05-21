import React from 'react';

type ContextHookWithProvider<T> = {
  useDefinedContext: () => T;
  provider: React.Provider<T>;
};

/**
 * Return a hook and a provider which return a value that must be defined. Normally is difficult
 * because `React.createContext()` defaults to `undefined`.
 *
 * `useDefinedContext()` must be called inside of `provider`, otherwise an error will be thrown.
 */
export function createDefinedContext<T>(): ContextHookWithProvider<T> {
  /* This non-null assertion will indeed cause problems if the provider is passed
     a nullable value, but the below `throw` should catch that case. */

  /* eslint-disable-next-line @typescript-eslint/no-non-null-assertion */
  const context = React.createContext<T>(undefined!);

  const useDefinedContext = (): T => {
    const used = React.useContext(context);
    // not doing !used because `used` could be a number
    if (used === undefined) {
      throw new Error(
        'useDefinedContext is undefined! Make sure it is used in a provider and passed a defined value.'
      );
    }
    return used;
  };

  return {
    useDefinedContext,
    provider: context.Provider,
  };
}
