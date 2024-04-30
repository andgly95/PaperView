import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { APIResponse, Result } from '../interfaces/api.interfaces';

@Injectable({
  providedIn: 'root',
})
export class CoreApiService {
  private readonly apiUrl = 'https://api.core.ac.uk/v3/search/works';

  constructor(private http: HttpClient) {}

  fetchPapers(params: { q: string; limit: number }): Observable<Result[]> {
    return this.http
      .get<APIResponse>(this.apiUrl, { params })
      .pipe(map((response) => response.results));
  }
}
