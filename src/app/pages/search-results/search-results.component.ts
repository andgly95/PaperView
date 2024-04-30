import { Component } from '@angular/core';
import { SearchService } from '../../services/search.service';
import { ActivatedRoute } from '@angular/router';
import { ResultCardComponent } from '../../components/result-card/result-card.component';
import { SearchIconComponent } from '../../components/icons/search-icon/search-icon.component';
import { KeywordChartComponent } from '../../components/keyword-chart/keyword-chart.component';
import { Result } from '../../interfaces';
import { SearchHeaderComponent } from '../../components/search-header/search-header.component';
import keyword_extractor from 'keyword-extractor';

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
  keywords: string[] = [];
  keywordData: { keyword: string; count: number }[] = [];
  selectedPaperKeywordData: { keyword: string; count: number }[] = [];

  constructor(
    public searchService: SearchService,
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
    this.selectedPaperKeywordData = this.extractKeywords(
      [paper],
      this.searchService.searchInput()
    );
    console.log(this.selectedPaperKeywordData);
  }

  onPaperClicked(paper: Result) {
    this.selectedPaperKeywordData = this.extractKeywords(
      [paper],
      this.searchService.searchInput()
    );
  }

  private updateKeywordChart(): void {
    const query = this.searchService.searchInput();
    const papers = this.searchService.results();

    if (query && papers) {
      this.keywordData = this.extractKeywords(papers, query);
      this.keywords = this.keywordData.map((data) => data.keyword);
    } else {
      this.keywordData = [];
      this.keywords = [];
    }
  }

  private extractKeywords(
    papers: Result[],
    query: string
  ): { keyword: string; count: number }[] {
    const queryKeywords = keyword_extractor.extract(query, {
      language: 'english',
      remove_digits: true,
      return_changed_case: true,
      remove_duplicates: true,
    });

    const keywordCounts: { [keyword: string]: number } = {};

    queryKeywords.forEach((keyword) => {
      let count = 0;

      papers.forEach((paper) => {
        const extractKeywordsFromText = (text: string | null | undefined) => {
          if (text) {
            return text
              .split(/\s+/)
              .filter((word) =>
                keyword.toLowerCase().includes(word.toLowerCase())
              );
          }
          return [];
        };

        const titleKeywords = extractKeywordsFromText(paper.title);
        const abstractKeywords = extractKeywordsFromText(paper.abstract);

        count += titleKeywords.length + abstractKeywords.length;
      });

      keywordCounts[keyword] = count;
    });

    return Object.entries(keywordCounts).map(([keyword, count]) => ({
      keyword,
      count,
    }));
  }
}
