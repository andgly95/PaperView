import { Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { Result } from '../interfaces';
import { CoreApiService } from './core-api.service';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  public searchInput = signal<string>('drone');
  public numPapers = signal<number>(10);
  public results = signal<Result[]>([]);

  constructor(private coreApiService: CoreApiService) {}

  searchPapers(): Observable<Result[]> {
    const params = {
      q: this.searchInput(),
      limit: this.numPapers(),
    };

    return this.coreApiService.fetchPapers(params);
  }
}
