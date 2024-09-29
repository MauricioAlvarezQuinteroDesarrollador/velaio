import { AbstractControl } from '@angular/forms';

export function adult(control: AbstractControl) {
  const controlValue = parseInt(control.value);

  if (controlValue >= 18) return null;

  return {
    adult: true,
  };
}

export function noWhiteSpaceValidator(control: AbstractControl) {
  const isWhitespace = (control.value || '').trim().length === 0;
  const isValid = !isWhitespace;
  return isValid ? null : { whitespace: true };
}
