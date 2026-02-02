import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-job-skills',
  standalone: true,
  templateUrl:'./job-skills.component.html',
  styleUrl: './job-skills.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JobSkillsComponent {
  techStack = input.required<readonly string[]>();
}
