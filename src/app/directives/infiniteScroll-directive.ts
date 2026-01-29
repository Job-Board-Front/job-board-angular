import { Directive, Output, Input, EventEmitter, NgZone, AfterViewInit, output, input } from '@angular/core';

@Directive({
  selector: '[appInfiniteScroll]',
  standalone: true,
  exportAs: 'infiniteScroll',
})
export class InfiniteScrollDirective implements AfterViewInit {
   threshold = input<number>(100);

    scrolledToBottom = output<void>();

  private isLoading = false;

  constructor(private ngZone: NgZone) {}

  ngAfterViewInit() {
    this.ngZone.runOutsideAngular(() => {
      window.addEventListener('scroll', this.onScroll, { passive: true });
    });
  }
  ngOnDestroy() { window.removeEventListener('scroll', this.onScroll); }
  private onScroll = () => {
    if (this.isLoading) return;

    const scrollPosition = window.innerHeight + window.scrollY;
    const pageHeight = document.documentElement.offsetHeight;

    if (scrollPosition >= pageHeight - this.threshold()) {
      console.log('Scrolled near bottom, emitting event');
      this.ngZone.run(() => this.scrolledToBottom.emit());
    }
  };

  setLoading(loading: boolean) {
    this.isLoading = loading;
  }
}
