import {
  AfterViewInit,
  Directive,
  ElementRef,
  inject,
  OnDestroy,
} from '@angular/core';
import { FormGroupDirective } from '@angular/forms';

/**
 * Stops input events from bubbling so Angular never runs change detection on keystroke.
 * Attach to the form; intercepts input/compositionend at document (capture phase),
 * updates the form control, and stops propagation.
 */
@Directive({
  selector: 'form[formGroup][noCdOnInput]',
  standalone: true,
})
export class FormNoCdOnInputDirective implements AfterViewInit, OnDestroy {
  private readonly formEl = inject(ElementRef<HTMLFormElement>).nativeElement;
  private readonly formGroup = inject(FormGroupDirective);

  private boundInput = (e: Event) => this.onInput(e);
  private boundCompositionEnd = (e: Event) => this.onCompositionEnd(e);

  ngAfterViewInit(): void {
    document.addEventListener('input', this.boundInput, true);
    document.addEventListener('compositionend', this.boundCompositionEnd, true);
  }

  ngOnDestroy(): void {
    document.removeEventListener('input', this.boundInput, true);
    document.removeEventListener('compositionend', this.boundCompositionEnd, true);
  }

  private onInput(e: Event): void {
    const target = e.target as HTMLElement;
    if (!this.formEl.contains(target)) return;
    if (!this.isFormControlInput(target)) return;
    const name = target.getAttribute('formControlName');
    if (!name) return;
    const control = this.formGroup.form.get(name);
    if (control && !(e as InputEvent).isComposing) {
      const value = (target as HTMLInputElement | HTMLTextAreaElement).value;
      control.setValue(value, { emitEvent: false });
    }
    e.stopPropagation();
    e.stopImmediatePropagation();
  }

  private onCompositionEnd(e: Event): void {
    const target = e.target as HTMLElement;
    if (!this.formEl.contains(target)) return;
    if (!this.isFormControlInput(target)) return;
    const name = target.getAttribute('formControlName');
    if (!name) return;
    const control = this.formGroup.form.get(name);
    if (control) {
      const value = (target as HTMLInputElement | HTMLTextAreaElement).value;
      control.setValue(value, { emitEvent: false });
    }
    e.stopPropagation();
    e.stopImmediatePropagation();
  }

  private isFormControlInput(el: HTMLElement): boolean {
    const tag = el.tagName.toLowerCase();
    if (tag !== 'input' && tag !== 'textarea') return false;
    if (el.hasAttribute('formControlName') && el.hasAttribute('cdOnFocusBlur'))
      return true;
    return false;
  }
}
