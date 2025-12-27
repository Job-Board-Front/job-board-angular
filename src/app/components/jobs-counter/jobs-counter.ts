import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-jobs-counter',
  imports: [],
  templateUrl: './jobs-counter.html',
  styleUrl: './jobs-counter.css',
})
export class JobsCounter {
 @Input() count: number = 0;
}
