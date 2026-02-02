import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

@Component({
  selector: 'app-drop-down-menu',
  imports: [],
  templateUrl: './drop-down-menu.component.html',
  styleUrl: './drop-down-menu.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DropDownMenuComponent {
  value = input<string>('');
  options = input<string[]>([]);
  label = input<string>('');
  id = input<string>('');
  ariaLabel = input<string>('');

  selectedOption = output<string>();
}
