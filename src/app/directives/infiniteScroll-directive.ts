import { Directive, output, input } from '@angular/core';

@Directive({
    selector: '[appInfiniteScroll]',
    standalone: true,
    exportAs: 'infiniteScroll',
    host: {
    '(window:scroll)': 'onScroll()',
  },

})
export class InfiniteScrollDirective {
    threshold = input<number>(100);
    
    scrolledToBottom = output<void>();
    
    private isLoading = false;

    onScroll() {
        if (this.isLoading) return;

        const scrollPosition = window.innerHeight + window.scrollY;
        const pageHeight = document.documentElement.offsetHeight;

        if (scrollPosition >= pageHeight - this.threshold()) {
        console.log('Scrolled near bottom, emitting event');
        this.scrolledToBottom.emit();
        }
    }

    setLoading(loading: boolean) {
        this.isLoading = loading;
    }
}