import { useEffect } from 'react';

/**
 * Executes the callback `cb` every `poll` ms
 * @param cb callback to execute
 * @param poll ms to poll
 * @param execFirst if we want to execute the callback on first render
 */
export function usePoll(
  cb: () => void,
  poll: number | undefined = undefined,
  execFirst: boolean | undefined = undefined
) {
  useEffect(() => {
    if (execFirst) cb();

    if (!poll) return;
    const interval = setInterval(cb, poll);

    return () => clearInterval(interval);
  }, [poll, cb, execFirst]);
}
