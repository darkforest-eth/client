import { useEffect, useRef } from 'react';
import { useEmitterValue } from './EmitterHooks';
import { keyUp$ } from './KeyEmitters';

// planet context pane shortcuts
export const TOGGLE_PLANET_ARTIFACTS_PANE = 'a';
export const TOGGLE_HAT_PANE = 'h';
export const TOGGLE_BROADCAST_PANE = 'b';
export const TOGGLE_UPGRADES_PANE = 'u';

// global shortcuts
export const TOGGLE_PLANET_DEX_PANE = 'q';
export const TOGGLE_ARTIFACTS_DEX_PANE = 'e';
export const TOGGLE_DIAGNOSTICS_PANE = 'p';

export function useSubscribeToShortcut(key: string | undefined, callback: () => void) {
  const keyUp = useEmitterValue(keyUp$, undefined);
  const lastKeyUp = useRef(keyUp);

  useEffect(() => {
    if (!keyUp || !key) return;
    if (lastKeyUp.current === keyUp) return;
    if (keyUp.value !== key) return;

    lastKeyUp.current = keyUp;
    callback();
  }, [key, keyUp, lastKeyUp, callback]);
}
