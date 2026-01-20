export enum EmploymentType {
  FULL_TIME = 'full-time',
  PART_TIME = 'part-time',
  CONTRACT = 'contract',
  INTERNSHIP = 'internship'
}

export enum ExperienceLevel {
  JUNIOR = 'junior',
  MID = 'mid',
  SENIOR = 'senior'
}

export interface Job {
  readonly id: string;
  readonly logo?: string;
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
}


export interface Bookmark {
  readonly id?: string;
  readonly userId: string;
  readonly jobId: string;
  readonly createdAt: string; 
}


export interface JobSearchFilters {
  search?: string; // Keyword search
  location?: string;
  employmentType?: EmploymentType;
  experienceLevel?: ExperienceLevel;
  limit?: number;
  cursor?: string; 
}


export interface PaginatedResponse<T> {
  data: T[];
  nextCursor: string | null;
}
