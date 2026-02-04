import {
  AfterViewInit,
  Directive,
  ElementRef,
  inject,
  OnDestroy,
  forwardRef,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Directive({
  selector:
    'input[formControlName][cdOnFocusBlur]:not([type=checkbox]):not([type=radio]), textarea[formControlName][cdOnFocusBlur]',
  standalone: true,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CdOnFocusBlurValueAccessorDirective),
      multi: true,
    },
  ],
})
export class CdOnFocusBlurValueAccessorDirective
  implements ControlValueAccessor, AfterViewInit, OnDestroy
{
  private readonly el = inject(ElementRef<HTMLInputElement | HTMLTextAreaElement>);

  private onChange: (value: string) => void = () => {};
  private onTouched: () => void = () => {};
  private composing = false;

  private inputListener = (e: Event) => {
    e.stopPropagation();
    e.stopImmediatePropagation();
    this.handleInput();
  };
  private blurListener = () => this.onTouched();
  private compositionStartListener = () => {
    this.composing = true;
  };
  private compositionEndListener = (e: CompositionEvent) => {
    this.composing = false;
    this.handleInputValue((e.target as HTMLInputElement | HTMLTextAreaElement)?.value);
  };

  ngAfterViewInit(): void {
    const native = this.el.nativeElement;
    native.addEventListener('input', this.inputListener);
    native.addEventListener('blur', this.blurListener);
    native.addEventListener('compositionstart', this.compositionStartListener);
    native.addEventListener('compositionend', this.compositionEndListener as EventListener);
  }

  ngOnDestroy(): void {
    const native = this.el.nativeElement;
    native.removeEventListener('input', this.inputListener);
    native.removeEventListener('blur', this.blurListener);
    native.removeEventListener('compositionstart', this.compositionStartListener);
    native.removeEventListener('compositionend', this.compositionEndListener as EventListener);
  }

  writeValue(value: string | null): void {
    const normalized = value ?? '';
    if (this.el.nativeElement.value !== normalized) {
      this.el.nativeElement.value = normalized;
    }
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.el.nativeElement.disabled = isDisabled;
  }

  private handleInput(): void {
    if (this.composing) return;
    this.onChange(this.el.nativeElement.value);
  }

  private handleInputValue(value: string): void {
    this.onChange(value);
  }
}
