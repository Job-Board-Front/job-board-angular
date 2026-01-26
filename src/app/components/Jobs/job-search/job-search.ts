import {
  Component,
  ChangeDetectionStrategy,
  inject,
  DestroyRef,
  output,
  signal,
  input,
  effect,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-job-search',
  imports: [],
  templateUrl: './job-search.html',
  styleUrls: ['./job-search.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JobSearch {
  private readonly destroyRef = inject(DestroyRef);
  private readonly input$ = new Subject<string>();

  readonly value = input<string>('');
  readonly searchValue = signal('');
  readonly search = output<string>();

  constructor() {
    this.input$
      .pipe(debounceTime(300), distinctUntilChanged(), takeUntilDestroyed(this.destroyRef))
      .subscribe((value) => this.search.emit(value));

    effect(() => {
      const externalValue = this.value();
      this.searchValue.set(externalValue);
      if (externalValue === '') {
        this.input$.next('');
      }
    });
  }

  onInput(value: string) {
    const trimmed = value.trim();
    this.searchValue.set(trimmed);
    this.input$.next(trimmed);
  }
}
