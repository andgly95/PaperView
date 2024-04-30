import { Injectable, signal } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Result } from '../interfaces/api.interfaces';
import { CoreApiService } from './core-api.service';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  public searchInput = signal<string>('');
  public numPapers = signal<number>(10);
  public results = signal<Result[]>([]);
  public loading = signal<boolean>(false);

  constructor(private coreApiService: CoreApiService) {}

  searchPapers(): Observable<Result[]> {
    const params = {
      q: this.searchInput(),
      limit: this.numPapers(),
    };
    this.loading.set(true);

    return this.coreApiService.fetchPapers(params).pipe(
      tap((results) => {
        this.results.set(results);
        this.loading.set(false);
      })
    );
  }
}
