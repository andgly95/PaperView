import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { SearchService } from '../services/search.service';

@Injectable({ providedIn: 'root' })
export class SearchResolver implements Resolve<any> {
  constructor(private searchService: SearchService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    const searchTerm = route.queryParams['q'];
    const limit = route.queryParams['limit'];
    this.searchService.searchInput.set(searchTerm);
    if (limit) {
      this.searchService.numPapers.set(parseInt(limit, 10));
    }
    return this.searchService.searchPapers();
  }
}
