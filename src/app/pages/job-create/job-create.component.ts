import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { JobFormComponent } from '@/app/components/Jobs/job-form/job-form.component';
import { JobsService } from '@/app/api/jobs.service';
import { CreateJobDto } from '@/app/interfaces/api/job.models';
import { APP_ROUTES } from '@/app/route-names/route-names.constants';

@Component({
  selector: 'app-job-create',
  standalone: true,
  imports: [JobFormComponent],
  templateUrl: './job-create.component.html',
  styleUrl: './job-create.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JobCreateComponent {
  private readonly jobsService = inject(JobsService);
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);

  protected readonly APP_ROUTES = APP_ROUTES;

  readonly isSubmitting = signal(false);
  readonly errorMessage = signal('');

  onFormSubmit(event: { payload: CreateJobDto; logoFile: File | null }) {
    this.isSubmitting.set(true);
    this.errorMessage.set('');

    this.jobsService
      .createJob(event.payload)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res) => {
          if (event.logoFile) {
            this.jobsService
              .uploadLogo(res.id, event.logoFile)
              .pipe(takeUntilDestroyed(this.destroyRef))
              .subscribe({
                next: () => this.router.navigate(['/details', res.id]),
                error: (err) => {
                  this.errorMessage.set(err.error?.message ?? err.message ?? 'Job created but logo upload failed');
                  this.isSubmitting.set(false);
                },
              });
          } else {
            this.router.navigate(['/details', res.id]);
          }
        },
        error: (err) => {
          this.errorMessage.set(err.error?.message ?? err.message ?? 'Failed to create job');
          this.isSubmitting.set(false);
        },
      });
  }
}
