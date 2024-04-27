import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';

import { SearchService } from '../../services/search.service';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ResultCardComponent } from '../../components/result-card/result-card.component';
import { SearchIconComponent } from '../../components/search-icon/search-icon.component';

@Component({
  selector: 'pv-search-results',
  standalone: true,
  imports: [
    NgIf,
    NgFor,
    AsyncPipe,
    FormsModule,
    RouterModule,
    ResultCardComponent,
    SearchIconComponent,
  ],
  templateUrl: './search-results.component.html',
  styleUrl: './search-results.component.scss',
})
export class SearchResultsComponent {
  constructor(
    public searchService: SearchService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.activatedRoute.queryParams.subscribe((params) => {
      this.searchService.searchInput.set(params['q']);
    });
    this.activatedRoute.data.subscribe((data) => {
      this.searchService.results.set(data['searchResults']);
    });
  }

  onSearch(): void {
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: { q: this.searchService.searchInput() },
      queryParamsHandling: 'merge',
    });
  }
}
