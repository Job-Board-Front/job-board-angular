import {
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  inject,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { JobFormComponent } from '@/app/components/Jobs/job-form/job-form.component';
import { JobsService } from '@/app/api/jobs.service';
import { CreateJobDto } from '@/app/interfaces/api/job.models';
import { APP_ROUTES } from '@/app/route-names/route-names.constants';

@Component({
  selector: 'app-job-edit',
  standalone: true,
  imports: [JobFormComponent],
  templateUrl: './job-edit.component.html',
  styleUrl: './job-edit.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JobEditComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly jobsService = inject(JobsService);
  private readonly destroyRef = inject(DestroyRef);

  private readonly jobId = toSignal(
    this.route.paramMap.pipe(map((params) => params.get('id') ?? undefined)),
  );

  private readonly jobResource = this.jobsService.getJobById(this.jobId);

  readonly job = computed(() => this.jobResource.value());
  readonly isLoading = computed(() => this.jobResource.isLoading?.() ?? false);
  readonly error = computed(() => this.jobResource.error?.() ?? undefined);

  readonly isSubmitting = signal(false);
  readonly errorMessage = signal('');

  protected readonly cancelRoute = computed(() => {
    const id = this.jobId();
    return id ? ['/details', id] : ['/', APP_ROUTES.jobs];
  });

  onFormSubmit(event: { payload: CreateJobDto; logoFile: File | null }) {
    const id = this.jobId();
    if (!id) return;

    this.isSubmitting.set(true);
    this.errorMessage.set('');

    this.jobsService
      .updateJob(id, event.payload)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {
          if (event.logoFile) {
            this.jobsService
              .uploadLogo(id, event.logoFile)
              .pipe(takeUntilDestroyed(this.destroyRef))
              .subscribe({
                next: () => this.router.navigate(['/details', id]),
                error: (err) => {
                  this.errorMessage.set(err.error?.message ?? err.message ?? 'Job updated but logo upload failed');
                  this.isSubmitting.set(false);
                },
              });
          } else {
            this.router.navigate(['/details', id]);
          }
        },
        error: (err) => {
          this.errorMessage.set(err.error?.message ?? err.message ?? 'Failed to update job');
          this.isSubmitting.set(false);
        },
      });
  }
}
