import { Injectable, inject, Signal } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { httpResource } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { CreateJobDto, Job, JobSearchFilters, PaginatedResponse } from '../interfaces/api/job.models';


@Injectable({
  providedIn: 'root'
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
        params: this.buildHttpParams(currentFilters)
      };
    });
  }

  getJobsPaginated(
    paramsSignal: Signal<{ filters?: JobSearchFilters; cursor?: string; limit?: number } | undefined>
  ) {
    return httpResource<PaginatedResponse<Job>>(() => {
      const request = paramsSignal();
      let params = this.buildHttpParams(request?.filters);
      params = params.set('limit', String(request?.limit ?? 10));
      if (request?.cursor) {
        params = params.set('cursor', request.cursor);
      }
      return { url: `${this.baseUrl}/jobs`, params };
    });
  }

  getJobById(jobId: Signal<string | undefined>) { 
  return httpResource<Job>(() => {
    const id = jobId();
    if (!id) return undefined;
    
    return {
      url: `${this.baseUrl}/jobs/${id}`
    };
   });
  }

  createJob(createJobDto: CreateJobDto): Observable<Job> {
    return this.http.post<Job>(this.baseUrl, createJobDto);
  }

  deleteJob(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  private buildHttpParams(filters?: JobSearchFilters): HttpParams {
    let params = new HttpParams();
    if (!filters) return params;
    
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        if (Array.isArray(value)) {
          value.forEach(v => params = params.append(key, String(v)));
        } else {
          params = params.set(key, String(value));
        }
      }
    });
    return params;
  }
}