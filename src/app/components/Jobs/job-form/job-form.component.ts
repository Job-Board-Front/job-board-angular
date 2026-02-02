import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  ElementRef,
  input,
  inject,
  output,
  signal,
  viewChild,
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import {
  CreateJobDto,
  EmploymentType,
  ExperienceLevel,
  Job,
  SalaryRange,
} from '@/app/interfaces/api/job.models';
import { ButtonComponent } from '@/app/components/shared/button/button.component';
import { APP_ROUTES } from '@/app/route-names/route-names.constants';
import { AbsoluteUrlPipe } from '@/app/pipes/absolute-url.pipe';
import {
  logoFileSizeValidator,
  logoFileTypeValidator,
  MAX_LOGO_SIZE_BYTES,
} from '@/app/validators/logo.validators';
import { UI_TOKENS } from '@/app/core/ui/ui.config';

@Component({
  selector: 'app-job-form',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, ButtonComponent, AbsoluteUrlPipe],
  templateUrl: './job-form.component.html',
  styleUrl: './job-form.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JobFormComponent {
  private readonly fb = inject(FormBuilder);
  readonly jobInput = input<Job | null>(null);

  readonly submitLabel = input<string>('Create Job');
  readonly cancelRoute = input<string | string[]>(`/${APP_ROUTES.jobs}`);
  readonly isSubmittingInput = input<boolean>(false);
  readonly errorMessageInput = input<string>('');
  readonly formSubmit = output<{ payload: CreateJobDto; logoFile: File | null }>();

  protected readonly inputClass = UI_TOKENS.input;
  protected readonly employmentTypes = [
    { value: EmploymentType.FULL_TIME, label: 'Full-time' },
    { value: EmploymentType.PART_TIME, label: 'Part-time' },
    { value: EmploymentType.CONTRACT, label: 'Contract' },
    { value: EmploymentType.INTERNSHIP, label: 'Internship' },
  ];
  protected readonly experienceLevels = [
    { value: ExperienceLevel.JUNIOR, label: 'Junior' },
    { value: ExperienceLevel.MID, label: 'Mid-level' },
    { value: ExperienceLevel.SENIOR, label: 'Senior' },
  ];
  protected readonly salaryRanges = [
    { value: SalaryRange.UNDER_50K, label: 'Under $50k' },
    { value: SalaryRange.FROM_50K_TO_100K, label: '$50k - $100k' },
    { value: SalaryRange.FROM_100K_TO_150K, label: '$100k - $150k' },
    { value: SalaryRange.OVER_150K, label: 'Over $150k' },
  ];

  readonly isSubmitting = computed(() => this.isSubmittingInput());
  readonly errorMessage = computed(() => this.errorMessageInput());
  protected readonly logoPreviewUrl = signal<string | null>(null);

  readonly form = this.fb.nonNullable.group({
    title: ['', [Validators.required, Validators.minLength(2)]],
    description: ['', [Validators.required]],
    company: ['', [Validators.required, Validators.minLength(2)]],
    location: ['', [Validators.required]],
    employmentType: [EmploymentType.FULL_TIME, [Validators.required]],
    experienceLevel: [ExperienceLevel.MID, [Validators.required]],
    salaryRange: ['' as string],
    techStack: [''],
    submissionLink: [''],
    logo: this.fb.control<File | null>(null, [
      logoFileTypeValidator(),
      logoFileSizeValidator(MAX_LOGO_SIZE_BYTES),
    ]),
  });

  constructor() {
    effect(() => {
      const job = this.jobInput();
      if (job) {
        this.form.patchValue({
          title: job.title,
          description: job.description,
          company: job.company,
          location: job.location,
          employmentType: job.employmentType,
          experienceLevel: job.experienceLevel,
          salaryRange: job.salaryRange ?? '',
          techStack: job.techStack?.join(', ') ?? '',
          submissionLink: job.submissionLink ?? '',
        });
      }
    });
  }

  protected getPayload(): CreateJobDto {
    const v = this.form.getRawValue();
    const techStack = v.techStack
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);
    return {
      title: v.title,
      description: v.description,
      company: v.company,
      location: v.location,
      employmentType: v.employmentType as EmploymentType,
      experienceLevel: v.experienceLevel as ExperienceLevel,
      ...(v.salaryRange ? { salaryRange: v.salaryRange } : {}),
      techStack,
      submissionLink: v.submissionLink || '',
    };
  }

  protected onLogoChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0] ?? null;
    const logoControl = this.form.get('logo');
    logoControl?.patchValue(file);
    logoControl?.markAsTouched();
    if (file) {
      const reader = new FileReader();
      reader.onload = () => this.logoPreviewUrl.set(reader.result as string);
      reader.readAsDataURL(file);
    } else {
      this.logoPreviewUrl.set(null);
    }
  }

  protected logoInput = viewChild<ElementRef<HTMLInputElement>>('logoInput');

  protected clearLogo(): void {
    this.form.get('logo')?.patchValue(null);
    this.logoPreviewUrl.set(null);
    const input = this.logoInput();
    if (input?.nativeElement) {
      input.nativeElement.value = '';
    }
  }

  protected onSubmit(): void {
    if (this.form.valid) {
      this.formSubmit.emit({
        payload: this.getPayload(),
        logoFile: this.form.getRawValue().logo,
      });
    } else {
      this.form.markAllAsTouched();
    }
  }
}
