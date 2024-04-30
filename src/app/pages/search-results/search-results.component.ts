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
  keywords = signal<string[]>([]);
  keywordData = signal<{ keyword: string; count: number }[]>([]);
  selectedPaperKeywordData = signal<{ keyword: string; count: number }[]>([]);

  constructor(
    public searchService: SearchService,
    private keywordService: KeywordService,
    private activatedRoute: ActivatedRoute
  ) {
    this.activatedRoute.queryParams.subscribe((params) => {
      this.searchService.searchInput.set(params['q']);
      this.updateKeywordChart();
    });

    this.activatedRoute.data.subscribe((data) => {
      this.searchService.results.set(data['searchResults']);
      this.updateKeywordChart();
    });
  }

  onPaperHovered(paper: Result) {
    this.selectedPaperKeywordData.set(
      this.keywordService.extractKeywords(
        [paper],
        this.searchService.searchInput()
      )
    );
  }

  onPaperClicked(paper: Result) {
    this.selectedPaperKeywordData.set(
      this.keywordService.extractKeywords(
        [paper],
        this.searchService.searchInput()
      )
    );
  }

  private updateKeywordChart(): void {
    const query = this.searchService.searchInput();
    const papers = this.searchService.results();

    if (query && papers) {
      this.keywordData.set(this.keywordService.extractKeywords(papers, query));
      this.keywords.set(this.keywordData().map((data) => data.keyword));
    } else {
      this.keywordData.set([]);
      this.keywords.set([]);
    }
  }
}
