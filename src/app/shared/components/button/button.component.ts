import {
  Component,
  ChangeDetectionStrategy,
  signal,
  computed,
  inject,
  ElementRef,
} from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent {
  // Internal state as signals
  label = signal('Action');
  disabled = signal(false);
  pressed = signal(false);

  // Derived/computed state example (not strictly necessary here)
  isInteractive = computed(() => !this.disabled());
}
