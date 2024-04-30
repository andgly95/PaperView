import { Injectable, signal } from '@angular/core';
import { Result } from '../interfaces/api.interfaces';
import keyword_extractor from 'keyword-extractor';
import { SearchService } from './search.service';

@Injectable({
  providedIn: 'root',
})
export class KeywordService {
  public keywords = signal<string[]>([]);
  public keywordData = signal<{ keyword: string; count: number }[]>([]);
  public selectedPaperKeywordData = signal<
    { keyword: string; count: number }[]
  >([]);

  constructor(public searchService: SearchService) {}

  updateKeywordChart(): void {
    const query = this.searchService.searchInput();
    const papers = this.searchService.results();

    if (query && papers) {
      this.keywordData.set(this.extractKeywords(papers, query));
      this.keywords.set(this.keywordData().map((data) => data.keyword));
    } else {
      this.keywordData.set([]);
      this.keywords.set([]);
    }
  }

  extractKeywords(
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
                word.toLowerCase().includes(keyword.toLowerCase())
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
