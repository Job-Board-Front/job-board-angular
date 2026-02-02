export enum EmploymentType {
  FULL_TIME = 'full-time',
  PART_TIME = 'part-time',
  CONTRACT = 'contract',
  INTERNSHIP = 'internship',
  ALL=''
}

export enum ExperienceLevel {
  JUNIOR = 'junior',
  MID = 'mid',
  SENIOR = 'senior',
  ALL=''
}

export interface Job {
  readonly id: string;
  readonly logoUrl?: string;
  readonly title: string;
  readonly description: string;
  readonly company: string;
  readonly location: string;
  readonly employmentType: EmploymentType;
  readonly experienceLevel: ExperienceLevel;
  readonly salaryRange?: string;
  readonly techStack: readonly string[];
  readonly keywords: readonly string[];
  readonly source: 'seeded' | 'manual';
  readonly isActive: boolean;
  readonly expiresAt: string;
  readonly createdAt: string;
  readonly updatedAt: string;
  readonly submissionLink?: string;
}

export interface CreateJobDto {
  title: string;
  description: string;
  company: string;
  location: string;
  employmentType: EmploymentType;
  experienceLevel: ExperienceLevel;
  salaryRange?: string;
  techStack: string[];
  submissionLink?: string;
}

export type UpdateJobDto = Partial<CreateJobDto>;


export interface Bookmark {
  readonly id: string;
  readonly createdAt: string;
  readonly expiresAt: string;
}


export enum SalaryRange {
  UNDER_50K = 'under-50k',
  FROM_50K_TO_100K = '50k-100k',
  FROM_100K_TO_150K = '100k-150k',
  OVER_150K = 'over-150k',
  ALL=''
}

export enum PostedWithin {
  LAST_24H = '24h',
  LAST_7D = '7d',
  LAST_30D = '30d',
  ALL=''
}

export interface JobSearchFilters {
  search?: string; // Keyword search
  location?: string;
  employmentType?: EmploymentType;
  experienceLevel?: ExperienceLevel;
  salaryRange?: SalaryRange;
  postedWithin?: PostedWithin;
  limit?: number;
  cursor?: string;
}


export interface PaginatedResponse<T> {
  data: T[];
  nextCursor: string | null;
  totalCount?: number;
}
