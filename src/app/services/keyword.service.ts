import { Injectable } from '@angular/core';
import { Result } from '../interfaces/api.interfaces';
import keyword_extractor from 'keyword-extractor';

@Injectable({
  providedIn: 'root',
})
export class KeywordService {
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
