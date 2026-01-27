import { Component } from '@angular/core';
import { Search, LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-job-search',
  imports: [LucideAngularModule],
  templateUrl: './job-search.html',
  styleUrl: './job-search.css',
})
export class JobSearch {
  readonly searchIcon = Search;
}
