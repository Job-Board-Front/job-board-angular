import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { CreateJobDto, Job, JobSearchFilters, PaginatedResponse, RemotiveResponse } from '../interfaces/api/job.models';


@Injectable({
  providedIn: 'root'
})
export class JobsService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiUrl}`;
  allJobs: Job[] = [];


 
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
  
  getJobsByPage(
  page: number, 
  limit: number,
  filters?: JobSearchFilters
): Observable<Job[]> {
  let params = new HttpParams().set('limit', String(limit*page));

  if (filters) {
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        params = params.append(key, String(value));
      }
    });
  }

  console.log(`Fetching page ${page} with limit ${limit}`);
  console.log('URL params:', params.toString());

  return this.http.get<RemotiveResponse<Job>>(this.baseUrl, { params }).pipe(
    map(res => {
      this.allJobs = res.jobs; 
      const start = (page - 1) * limit;
      const end = start + limit;
      return this.allJobs.slice(start, end);
    }),
    tap(data => console.log(`Received ${data.length} jobs for page ${page}`))
  );
}
}