import { Component, Input } from '@angular/core';
import { Job } from '../../models/job.model';
import { JobCard } from '../job-card/job-card';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-job-list',
  imports: [JobCard, CommonModule, JobCard],
  templateUrl: './job-list.html',
  styleUrl: './job-list.css',
})
export class JobList {

  jobs: Job[] = [
    {
      id: 1,
      title: 'Senior Frontend Developer',
      company: 'TechCorp',
      category: 'Engineering',
      location: 'San Francisco, CA',
      type: 'Full-time',
      salary: '$120k - $180k',
      logo: '🦋'
    },
    {
      id: 2,
      title: 'Product Designer',
      company: 'DesignHub',
      category: 'Design',
      location: 'Remote',
      type: 'Full-time',
      salary: '$90k - $140k',
      logo: '🎨',
      remote: true
    },
    {
      id: 3,
      title: 'Backend Engineer',
      company: 'DataFlow',
      category: 'Engineering',
      location: 'New York, NY',
      type: 'Full-time',
      salary: '$130k - $190k',
      logo: '💎'
    },
    {
      id: 4,
      title: 'Marketing Manager',
      company: 'GrowthLabs',
      category: 'Marketing',
      location: 'Austin, TX',
      type: 'Full-time',
      salary: '$80k - $120k',
      logo: '📊'
    },
    {
      id: 5,
      title: 'DevOps Engineer',
      company: 'CloudScale',
      category: 'Engineering',
      location: 'Seattle, WA',
      type: 'Full-time',
      salary: '$110k - $160k',
      logo: '☁️'
    },
    {
      id: 6,
      title: 'Data Scientist',
      company: 'AI Innovations',
      category: 'Data Science',
      location: 'Boston, MA',
      type: 'Full-time',
      salary: '$120k - $170k',
      logo: '🤖'
    }
  ];

}
