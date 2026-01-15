import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { CreateJobDto, Job, JobSearchFilters, PaginatedResponse } from '../interfaces/api/job.models';


@Injectable({
  providedIn: 'root'
})
export class JobsService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiUrl}/jobs`;

 
  getJobs(filters?: JobSearchFilters): Observable<Job[]> {
    let params = new HttpParams();

    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          params = params.append(key, String(value));
        }
      });
    }

    return this.http.get<PaginatedResponse<Job>>(this.baseUrl, { params }).pipe(
      map(response => response.data)
    );
  }

  
  getJobsPaginated(
    filters?: JobSearchFilters, 
    cursor?: string,
    limit: number = 10
  ): Observable<PaginatedResponse<Job>> {
    let params = new HttpParams();

    params = params.append('limit', String(limit));

    if (cursor) {
      params = params.append('cursor', cursor);
    }

    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          params = params.append(key, String(value));
        }
      });
    }

    return this.http.get<PaginatedResponse<Job>>(this.baseUrl, { params });
  }

  getJobById(id: string): Observable<Job> {
    return this.http.get<Job>(`${this.baseUrl}/${id}`);
  }

 
  createJob(createJobDto: CreateJobDto): Observable<Job> {
    return this.http.post<Job>(this.baseUrl, createJobDto);
  }


  deleteJob(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}