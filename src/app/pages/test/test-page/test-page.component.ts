import { ButtonComponent } from '@/app/components/shared/button/button.component';
import { JobCardComponent } from '@/app/components/shared/job-card/job-card.component';
import { EmploymentType, ExperienceLevel, Job } from '@/app/interfaces/api/job.models';
import { Component, HostBinding, inject, signal } from '@angular/core';
import { ThemeToggleComponent } from '@/app/components/navbar/theme-toggle/theme-toggle.component';
import { ThemeService } from '@/app/services/theme/theme.service';
import { DropDownMenuComponent } from '@/app/components/shared/drop-down-menu/drop-down-menu.component';
import { MenuItemComponent } from '@/app/components/shared/drop-down-menu/menu-item/menu-item.component';
import { IconComponent } from '@/app/components/shared/icon/icon.component';

@Component({
  selector: 'app-test-page',
  imports: [
    JobCardComponent,
    ButtonComponent,
    ThemeToggleComponent,
    DropDownMenuComponent,
    MenuItemComponent,
    IconComponent,
  ],
  templateUrl: './test-page.component.html',
  styleUrl: './test-page.component.css',
})
export class TestPageComponent {
  private themeService = inject(ThemeService);
  @HostBinding('class.dark')
  get isDarkMode() {
    return this.themeService.darkMode();
  }
  // Dummy Data
  jobs = signal<Job[]>([
    {
      id: '1',
      // logo: undefined, // Will test the fallback
      title: 'Senior Frontend Engineer',
      company: 'TechFlow',
      keywords: ['Engineering', 'SaaS'],
      techStack: ['Angular', 'Tailwind', 'TypeScript'],
      description: 'We are looking for an Angular expert to lead our frontend migration.',
      location: 'Remote, EMEA',
      employmentType: 'FULL_TIME' as EmploymentType,
      experienceLevel: 'SENIOR' as ExperienceLevel,
      salaryRange: '$60k - $90k',
      isActive: true,
      source: 'manual',
      createdAt: '2023-01-01T00:00:00.000Z',
      expiresAt: '2023-01-01T00:00:00.000Z',
      updatedAt: '2023-01-01T00:00:00.000Z',
    },
    {
      id: '2',
      logo: 'assets/logos/acme.png',
      title: 'Backend Developer',
      company: 'Acme Corp',
      keywords: ['Backend'],
      techStack: ['Node.js', 'PostgreSQL'],
      description: 'Join our backend team to build scalable APIs.',
      location: 'New York, USA',
      employmentType: 'CONTRACT' as EmploymentType,
      experienceLevel: 'MID' as ExperienceLevel,
      isActive: false, // Will test the closed state
      source: 'manual',
      createdAt: '2023-01-01T00:00:00.000Z',
      expiresAt: '2023-01-01T00:00:00.000Z',
      updatedAt: '2023-01-01T00:00:00.000Z',
    },
  ]);

  toggleBookmark(id: string) {
    console.log('Bookmark', id);
  }
  openJobDetails(id: string) {
    console.log('Open', id);
  }
}
