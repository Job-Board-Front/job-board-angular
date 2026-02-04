                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const ALLOWED_IMAGE_SUFFIXES = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];

export const MAX_LOGO_SIZE_BYTES = 2 * 1024 * 1024; // 2MB

export function logoFileTypeValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const file = control.value as File | null;
    if (!file) return null;
    const ext = '.' + (file.name.split('.').pop() ?? '').toLowerCase();
    const isValidType =
      file.type.startsWith('image/') && ALLOWED_IMAGE_SUFFIXES.includes(ext);
    return isValidType ? null : { logoFileType: { allowed: 'jpg, jpeg, png, gif, webp' } };
  };
}

export function logoFileSizeValidator(maxBytes: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const file = control.value as File | null;
    if (!file) return null;
    return file.size <= maxBytes ? null : { logoFileSize: { maxMb: maxBytes / (1024 * 1024) } };
  };
}
