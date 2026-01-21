import { UI_TOKENS } from '@/app/core/ui/ui.config';
import { Component, ElementRef, HostListener, signal } from '@angular/core';

@Component({
  selector: 'app-drop-down-menu',
  imports: [],
  templateUrl: './drop-down-menu.component.html',
  styleUrl: './drop-down-menu.component.css',
})
export class DropDownMenuComponent {
  //**************************IMPORTANT*****************************//
  //the content before passing the menu items MUST BE with a property : slot="trigger"
  isOpen = signal(false);
  tokens = UI_TOKENS;

  toggle() {
    this.isOpen.update((v) => !v);
  }
  close() {
    this.isOpen.set(false);
  }

  // Close when clicking outside
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (!this.elementRef.nativeElement.contains(target)) {
      this.close();
    }
  }

  constructor(private elementRef: ElementRef) {}
}
