import { Component, signal } from '@angular/core';
import { SearchService } from '../../services/search.service';
import { ActivatedRoute } from '@angular/router';
import { ResultCardComponent } from '../../components/result-card/result-card.component';
import { SearchIconComponent } from '../../components/icons/search-icon/search-icon.component';
import { KeywordChartComponent } from '../../components/keyword-chart/keyword-chart.component';
import { Result } from '../../interfaces/api.interfaces';
import { SearchHeaderComponent } from '../../components/search-header/search-header.component';
import keyword_extractor from 'keyword-extractor';
import { KeywordService } from '../../services/keyword.service';

@Component({
  selector: 'pv-search-results',
  standalone: true,
  imports: [
    SearchHeaderComponent,
    ResultCardComponent,
    SearchIconComponent,
    KeywordChartComponent,
  ],
  templateUrl: './search-results.component.html',
  styleUrl: './search-results.component.scss',
})
export class SearchResultsComponent {
  constructor(
    public searchService: SearchService,
    public keywordService: KeywordService,
    private activatedRoute: ActivatedRoute
  ) {
    this.activatedRoute.queryParams.subscribe((params) => {
      this.searchService.searchInput.set(params['q']);
      this.keywordService.updateKeywordChart();
    });

    this.activatedRoute.data.subscribe((data) => {
      this.searchService.results.set(data['searchResults']);
      this.keywordService.updateKeywordChart();
    });
  }

  onPaperHovered(paper: Result) {
    this.keywordService.selectedPaperKeywordData.set(
      this.keywordService.extractKeywords(
        [paper],
        this.searchService.searchInput()
      )
    );
  }

  onPaperClicked(paper: Result) {
    this.keywordService.selectedPaperKeywordData.set(
      this.keywordService.extractKeywords(
        [paper],
        this.searchService.searchInput()
      )
    );
  }
}
