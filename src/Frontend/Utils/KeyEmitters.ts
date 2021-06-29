import { Wrapper } from '../../Backend/Utils/Wrapper';
import { monomitter } from './Monomitter';

/* key emitters */
export const escapeDown$ = monomitter<KeyboardEvent>();
export const ctrlDown$ = monomitter<KeyboardEvent>();
export const ctrlUp$ = monomitter<KeyboardEvent>();
export const keyUp$ = monomitter<Wrapper<string>>();

/**
 * If the user is using their keyboard to input some text somewhere, we should NOT trigger the
 * shortcuts.
 */
function shouldIgnoreShortcutKeypress(e: KeyboardEvent): boolean {
  const targetElement = e.target as HTMLElement;
  return ['INPUT', 'TEXTAREA'].includes(targetElement.tagName);
}

document.addEventListener('keydown', (e: KeyboardEvent) => {
  if (shouldIgnoreShortcutKeypress(e)) return;

  if (e.key === 'Escape') escapeDown$.publish(e);
  else if (e.key === 'Control') ctrlDown$.publish(e);
});

document.addEventListener('keyup', (e: KeyboardEvent) => {
  if (shouldIgnoreShortcutKeypress(e)) return;

  if (e.key === 'Control') ctrlUp$.publish(e);
  keyUp$.publish(new Wrapper(e.key));
});
