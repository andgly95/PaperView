import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { SearchService } from '../../services/search.service';
import { KeywordChartComponent } from '../keyword-chart/keyword-chart.component';
import { LogoComponent } from '../logo/logo.component';
import { ResultCardComponent } from '../result-card/result-card.component';
import { SearchIconComponent } from '../icons/search-icon/search-icon.component';

@Component({
  selector: 'pv-search-header',
  standalone: true,
  imports: [
    FormsModule,
    RouterModule,
    LogoComponent,
    ResultCardComponent,
    SearchIconComponent,
    KeywordChartComponent,
  ],
  templateUrl: './search-header.component.html',
  styleUrl: './search-header.component.scss',
})
export class SearchHeaderComponent {
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
      queryParams: {
        q: this.searchService.searchInput(),
        limit: this.searchService.numPapers(),
      },
      queryParamsHandling: 'merge',
    });
  }
}
