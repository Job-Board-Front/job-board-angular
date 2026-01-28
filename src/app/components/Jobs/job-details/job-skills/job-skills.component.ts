import { Component, input } from '@angular/core';

@Component({
  selector: 'app-job-skills',
  standalone: true,
  templateUrl:'./job-skills.component.html',
  styleUrl: './job-skills.component.css'
})
export class JobSkillsComponent {
  techStack = input.required<readonly string[]>();
}