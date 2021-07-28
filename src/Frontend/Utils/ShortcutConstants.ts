import { useEffect, useRef } from 'react';
import { useEmitterValue } from './EmitterHooks';
import { keyUp$ } from './KeyEmitters';

// planet context pane shortcuts
export const MODAL_BACK_SHORTCUT = 'r';
export const TOGGLE_PLANET_ARTIFACTS_PANE = 's';
export const TOGGLE_HAT_PANE = 'x';
export const TOGGLE_BROADCAST_PANE = 'z';
export const TOGGLE_UPGRADES_PANE = 'a';
export const TOGGLE_SEND = 'q';

// global shortcuts
export const TOGGLE_PLANET_DEX_PANE = 'p';
export const TOGGLE_ARTIFACTS_DEX_PANE = 'o';
export const TOGGLE_DIAGNOSTICS_PANE = 'i';

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
