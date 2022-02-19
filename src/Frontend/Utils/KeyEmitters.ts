import { SpecialKey } from '@darkforest_eth/constants';
import { monomitter } from '@darkforest_eth/events';
import { Setting } from '@darkforest_eth/types';
import { useEffect, useState } from 'react';
import { Wrapper } from '../../Backend/Utils/Wrapper';
import { useUIManager } from './AppHooks';
import { useEmitterSubscribe } from './EmitterHooks';
import { useBooleanSetting } from './SettingsHooks';

export const keyUp$ = monomitter<Wrapper<string>>();
export const keyDown$ = monomitter<Wrapper<string>>();

const onKeyUp = (e: KeyboardEvent) => {
  if (!shouldIgnoreShortcutKeypress(e))
    keyUp$.publish(new Wrapper(getSpecialKeyFromEvent(e) || e.key.toLowerCase()));
};

const onKeyDown = (e: KeyboardEvent) => {
  if (!shouldIgnoreShortcutKeypress(e))
    keyDown$.publish(new Wrapper(getSpecialKeyFromEvent(e) || e.key.toLowerCase()));
};

export function listenForKeyboardEvents() {
  document.addEventListener('keydown', onKeyDown);
  document.addEventListener('keyup', onKeyUp);
}

export function unlinkKeyboardEvents() {
  document.removeEventListener('keydown', onKeyDown);
  document.removeEventListener('keyup', onKeyUp);
}

/**
 * If the user is using their keyboard to input some text somewhere, we should NOT trigger the
 * shortcuts.
 */
function shouldIgnoreShortcutKeypress(e: KeyboardEvent): boolean {
  const targetElement = e.target as HTMLElement;
  if (targetElement.tagName === 'INPUT')
    return targetElement.attributes.getNamedItem('type')?.value !== 'range';
  return targetElement.tagName === 'TEXTAREA';
}

function getSpecialKeyFromEvent(e: KeyboardEvent): string | undefined {
  if ((Object.values(SpecialKey) as string[]).includes(e.key)) {
    return e.key;
  }
}

export function useIsDown(key?: string) {
  const [isDown, setIsDown] = useState(false);
  useEmitterSubscribe(keyDown$, (k) => key !== undefined && k.value === key && setIsDown(true), [
    key,
    setIsDown,
  ]);
  useEmitterSubscribe(keyUp$, (k) => key !== undefined && k.value === key && setIsDown(false), [
    key,
    setIsDown,
  ]);
  return isDown;
}

export function useOnUp(key: string, onUp: () => void, deps: React.DependencyList = []) {
  const [disableDefaultShortcuts] = useBooleanSetting(
    useUIManager(),
    Setting.DisableDefaultShortcuts
  );

  useEffect(() => {
    const onKeyUp = (e: KeyboardEvent) => {
      if (
        (getSpecialKeyFromEvent(e) === key || e.key.toLowerCase() === key) &&
        !shouldIgnoreShortcutKeypress(e)
      ) {
        !disableDefaultShortcuts && onUp && onUp();
      }
    };

    document.addEventListener('keyup', onKeyUp);
    return () => document.removeEventListener('keyup', onKeyUp);
  }, [
    key,
    onUp,
    disableDefaultShortcuts,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    ...deps,
  ]);
}
