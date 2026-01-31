import {
  Component,
  ChangeDetectionStrategy,
  inject,
  DestroyRef,
  output,
  input,
  linkedSignal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { LucideAngularModule, SearchIcon } from 'lucide-angular';

@Component({
  selector: 'app-job-search',
  imports: [LucideAngularModule],
  templateUrl: './job-search.html',
  styleUrls: ['./job-search.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JobSearch {
  private readonly destroyRef = inject(DestroyRef);
  private readonly input$ = new Subject<string>();
  readonly searchIcon = SearchIcon;

  readonly value = input<string>('');
  readonly searchValue = linkedSignal<string, string>({
    source: this.value,
    computation: (src) => {
      if (src === '') {
        this.input$.next('');
      }

      return src;
    },
  });
  readonly search = output<string>();

  constructor() {
    this.input$
      .pipe(debounceTime(500), distinctUntilChanged(), takeUntilDestroyed(this.destroyRef))
      .subscribe((value) => {
        return this.search.emit(value);
      });
  }

  onInput(value: string) {
    const trimmed = value.trim();
    this.searchValue.set(trimmed);
    this.input$.next(trimmed);
  }
}
