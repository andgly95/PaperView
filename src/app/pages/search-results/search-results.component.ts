import { Component } from '@angular/core';
import { SearchService } from '../../services/search.service';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ResultCardComponent } from '../../components/result-card/result-card.component';
import { SearchIconComponent } from '../../components/search-icon/search-icon.component';
import { KeywordChartComponent } from '../../components/keyword-chart/keyword-chart.component';
import { Result } from '../../interfaces';
import { LogoComponent } from '../../components/logo/logo.component';
import { SearchHeaderComponent } from '../../components/search-header/search-header.component';

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
    const keywords = query.split(' ').map((keyword) => keyword.toLowerCase());
    const keywordCounts: { [keyword: string]: number } = {};

    papers.forEach((paper) => {
      const titleKeywords = this.extractKeywordsFromText(paper.title, keywords);
      const abstractKeywords = this.extractKeywordsFromText(
        paper.abstract,
        keywords
      );

      titleKeywords.forEach((keyword) => {
        keywordCounts[keyword] = (keywordCounts[keyword] || 0) + 1;
      });

      abstractKeywords.forEach((keyword) => {
        keywordCounts[keyword] = (keywordCounts[keyword] || 0) + 1;
      });
    });

    return Object.entries(keywordCounts).map(([keyword, count]) => ({
      keyword,
      count,
    }));
  }

  private extractKeywordsFromText(text: string, keywords: string[]): string[] {
    return keywords.filter((keyword) => text?.toLowerCase().includes(keyword));
  }
}
