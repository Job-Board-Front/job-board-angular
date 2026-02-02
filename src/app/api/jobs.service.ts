import { Injectable, inject, Signal } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { httpResource } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import {
  CreateJobDto,
  EmploymentType,
  ExperienceLevel,
  Job,
  JobSearchFilters,
  PaginatedResponse,
  UpdateJobDto,
} from '../interfaces/api/job.models';
import { FiltersData } from '../interfaces/api/filters-data.interface';

@Injectable({
  providedIn: 'root',
})
export class JobsService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiUrl}`;
  allJobs: Job[] = [];

  getJobs(filters: Signal<JobSearchFilters | undefined>) {
    return httpResource<PaginatedResponse<Job>>(() => {
      const currentFilters = filters();
      return {
        url: this.baseUrl,
        params: this.buildHttpParams(currentFilters),
      };
    });
  }

  getJobsPaginated(paramsSignal: Signal<JobSearchFilters | undefined>) {
    return httpResource<PaginatedResponse<Job>>(() => {
      const filters = paramsSignal();
      const params = this.buildHttpParams(filters);
      return { url: `${this.baseUrl}/jobs`, params };
    });
  }

  getJobById(jobId: Signal<string | undefined>) {
    return httpResource<Job>(() => {
      const id = jobId();
      if (!id) return undefined;

      return {
        url: `${this.baseUrl}/jobs/${id}`,
      };
    });
  }

  getJobsByIds(jobIds: Signal<string[]>) {
    return httpResource<Job[]>(() => {
      const ids = jobIds();
      if (!ids || ids.length === 0) return undefined;

      const idsString = ids.join(',');
      const params = new HttpParams().set('ids', idsString);

      return {
        url: `${this.baseUrl}/jobs/bulk`,
        params: params,
      };
    });
  }

  getFiltersData() {
    return httpResource<FiltersData>(
      () => {
        return {
          url: `${this.baseUrl}/filters`,
        };
      },
      {
        defaultValue: {
          locations: [],
          techStacks: [],
          employmentTypes: [
            EmploymentType.FULL_TIME,
            EmploymentType.PART_TIME,
            EmploymentType.CONTRACT,
            EmploymentType.INTERNSHIP,
          ],
          experienceLevels: [ExperienceLevel.JUNIOR, ExperienceLevel.MID, ExperienceLevel.SENIOR],
        },
      },
    );
  }

  createJob(createJobDto: CreateJobDto): Observable<{ id: string; message: string }> {
    return this.http.post<{ id: string; message: string }>(
      `${this.baseUrl}/jobs`,
      createJobDto,
    );
  }

  updateJob(id: string, updateJobDto: UpdateJobDto): Observable<{ updatedJob: Job; message: string }> {
    return this.http.put<{ updatedJob: Job; message: string }>(
      `${this.baseUrl}/jobs/${id}`,
      updateJobDto,
    );
  }

  deleteJob(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/jobs/${id}`);
  }

  uploadLogo(jobId: string, file: File): Observable<{ logoUrl: string; message: string }> {
    const formData = new FormData();
    formData.append('logo', file);
    return this.http.post<{ logoUrl: string; message: string }>(
      `${this.baseUrl}/jobs/${jobId}/logo`,
      formData,
    );
  }

  private buildHttpParams(filters?: JobSearchFilters): HttpParams {
    let params = new HttpParams();
    if (!filters) return params;

    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        if (Array.isArray(value)) {
          value.forEach((v) => (params = params.append(key, String(v))));
        } else {
          params = params.set(key, String(value));
        }
      }
    });
    return params;
  }
}
