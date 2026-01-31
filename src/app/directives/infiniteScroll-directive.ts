import { Directive, output, input, DestroyRef, inject } from '@angular/core';
import { fromEvent, throttleTime, filter } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Directive({
  selector: '[appInfiniteScroll]',
  standalone: true,
  exportAs: 'infiniteScroll',
})
export class InfiniteScrollDirective {
  private destroyRef = inject(DestroyRef);

  threshold = input<number>(50);
  throttle = input<number>(200);

  scrolledToBottom = output<void>();

  private isLoading = false;

  constructor() {
    fromEvent(window, 'scroll')
      .pipe(
        throttleTime(this.throttle()),
        filter(() => !this.isLoading),
        filter(() => this.isNearBottom()),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe(() => {
        console.log('Scrolled near bottom emitting event');
        this.scrolledToBottom.emit();
      });
  }

  private isNearBottom(): boolean {
    const scrollPosition = window.innerHeight + window.scrollY;
    const pageHeight = document.documentElement.offsetHeight;
    return scrollPosition >= pageHeight - this.threshold();
  }

  setLoading(loading: boolean) {
    this.isLoading = loading;
  }
}
