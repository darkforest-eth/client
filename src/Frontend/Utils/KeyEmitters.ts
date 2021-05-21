import { Wrapper } from '../../Backend/Utils/Wrapper';
import { monomitter } from './Monomitter';

/* key emitters */
export const escapeDown$ = monomitter<KeyboardEvent>();
export const ctrlDown$ = monomitter<KeyboardEvent>();
export const ctrlUp$ = monomitter<KeyboardEvent>();
export const keyUp$ = monomitter<Wrapper<string>>();

document.addEventListener('keydown', (e: KeyboardEvent) => {
  if (e.key === 'Escape') escapeDown$.publish(e);
  else if (e.key === 'Control') ctrlDown$.publish(e);
});

document.addEventListener('keyup', (e: KeyboardEvent) => {
  if (e.key === 'Control') ctrlUp$.publish(e);

  keyUp$.publish(new Wrapper(e.key));
});
