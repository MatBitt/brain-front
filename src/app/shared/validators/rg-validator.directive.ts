import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function rgValidator(): ValidatorFn {
  return (val: AbstractControl): ValidationErrors | null => {
    if (val.value == 7) {
      return null;
    }
    return { sizeError: true };
  };
}
