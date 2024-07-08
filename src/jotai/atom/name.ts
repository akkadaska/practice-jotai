import { atom } from 'jotai';
import { Atom } from 'jotai/experimental';
import { ValidationResult } from './types';

export const nameAtom = atom('');

export const nameValidationResultAtom: Atom<ValidationResult> = atom((get) => {
  const name = get(nameAtom);
  if (name.length === 0) {
    return { isValid: false, message: 'Name is required' };
  }
  return { isValid: true, message: '' };
});
