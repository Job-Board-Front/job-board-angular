import { Component } from '@angular/core';
import { Hero } from '../../components/Home/hero/hero';
import { JobList } from '../../components/Jobs/job-list/job-list';
@Component({
  selector: 'app-home',
  imports: [Hero, JobList],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {

}
