import { UiVariant, UiSize, UI_TOKENS } from '@/app/core/ui/ui.config';
import { CommonModule } from '@angular/common';
import { Component, computed, input, output } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-button',
  imports: [RouterLink, CommonModule],
  templateUrl: './button.component.html',
  styleUrl: './button.component.css',
})
export class ButtonComponent {
  // Inputs
  variant = input<UiVariant>('primary');
  size = input<UiSize>('md');
  rounded = input<'sm' | 'md' | 'lg' | 'full'>('md');
  type = input<'button' | 'submit'>('button');
  href = input<string | null>(null);
  class = input<string>('');

  // States
  disabled = input(false);
  loading = input(false);
  iconOnly = input(false);

  // Output
  onClick = output<MouseEvent>();

  computedClasses = computed(() => {
    const sizeKey: UiSize | 'icon_sm' | 'icon_md' | 'icon_lg' = this.iconOnly()
      ? `icon_${this.size()}`
      : this.size();

    return [
      'relative cursor-pointer inline-flex items-center justify-center font-medium select-none overflow-hidden',
      UI_TOKENS.rounded[this.rounded()],
      UI_TOKENS.transition,
      UI_TOKENS.focus,
      UI_TOKENS.sizes[sizeKey],
      UI_TOKENS.variants[this.variant()],
      this.disabled() || this.loading() ? UI_TOKENS.disabled : 'active:scale-95',
      this.class(),
    ].join(' ');
  });
}
