import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Hero } from '../../components/Home/hero/hero';
import { JobList } from '../../components/Jobs/job-list/job-list';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-home',
  imports: [Hero, JobList, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Home {}
