import { monomitter } from '@darkforest_eth/events';
import { useState } from 'react';
import { Wrapper } from '../../Backend/Utils/Wrapper';
import { useEmitterSubscribe } from './EmitterHooks';

/* key emitters */
export const escapeDown$ = monomitter<KeyboardEvent>();
export const ctrlDown$ = monomitter<KeyboardEvent>();
export const ctrlUp$ = monomitter<KeyboardEvent>();
export const keyUp$ = monomitter<Wrapper<string>>();
export const keyDown$ = monomitter<Wrapper<string>>();

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

document.addEventListener('keydown', (e: KeyboardEvent) => {
  if (shouldIgnoreShortcutKeypress(e)) return;

  if (e.key === 'Escape') escapeDown$.publish(e);
  else if (e.key === 'Control') ctrlDown$.publish(e);
  keyDown$.publish(new Wrapper(e.key));
});

document.addEventListener('keyup', (e: KeyboardEvent) => {
  if (shouldIgnoreShortcutKeypress(e)) return;

  if (e.key === 'Control') ctrlUp$.publish(e);
  keyUp$.publish(new Wrapper(e.key));
});

export function useIsDown(key?: string) {
  const [isDown, setIsDown] = useState(false);

  useEmitterSubscribe(keyDown$, (k) => key !== undefined && k.value === key && setIsDown(true));
  useEmitterSubscribe(keyUp$, (k) => key !== undefined && k.value === key && setIsDown(false));

  return isDown;
}
