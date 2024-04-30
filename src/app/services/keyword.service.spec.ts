import { TestBed } from '@angular/core/testing';
import { KeywordService } from './keyword.service';
import { SearchService } from './search.service';
import { Result } from '../interfaces/api.interfaces';
import { signal } from '@angular/core';
import { stubPaper } from '../../testing/stubs';

describe('KeywordService', () => {
  let keywordService: KeywordService;
  let searchService: SearchService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        KeywordService,
        {
          provide: SearchService,
          useValue: {
            searchInput: signal('test query'),
            results: signal([]),
          },
        },
      ],
    });

    keywordService = TestBed.inject(KeywordService);
    searchService = TestBed.inject(SearchService);
  });

  it('should create the service', () => {
    expect(keywordService).toBeTruthy();
  });

  it('should initialize keywords and keywordData signals', () => {
    expect(keywordService.keywords()).toEqual([]);
    expect(keywordService.keywordData()).toEqual([]);
    expect(keywordService.selectedPaperKeywordData()).toEqual([]);
  });

  it('should update the keyword chart when papers are available', () => {
    const papers: Result[] = [
      {
        ...stubPaper,
        title: 'Paper 1',
        abstract: 'This is a test paper about keyword1 and keyword2',
      },
      {
        ...stubPaper,
        title: 'Paper 2',
        abstract: 'Another test paper mentioning keyword1 and keyword3',
      },
    ];
    searchService.searchInput.set('test keyword1 keyword2 keyword3');
    searchService.results.set(papers);

    keywordService.updateKeywordChart();
    console.log(keywordService.keywordData());

    expect(keywordService.keywords()).toEqual([
      'test',
      'keyword1',
      'keyword2',
      'keyword3',
    ]);
    expect(keywordService.keywordData()).toEqual([
      { keyword: 'test', count: 2 },
      { keyword: 'keyword1', count: 2 },
      { keyword: 'keyword2', count: 1 },
      { keyword: 'keyword3', count: 1 },
    ]);
  });

  it('should clear the keyword chart when query or papers are missing', () => {
    searchService.searchInput.set('');
    searchService.results.set([]);

    keywordService.updateKeywordChart();

    expect(keywordService.keywords()).toEqual([]);
    expect(keywordService.keywordData()).toEqual([]);
  });

  it('should extract keywords from papers based on the query', () => {
    const papers: Result[] = [
      {
        ...stubPaper,
        title: 'Paper 1',
        abstract: 'This is a test paper about keyword1 and keyword2',
      },
      {
        ...stubPaper,
        title: 'Paper 2',
        abstract: 'Another test paper mentioning keyword1 and keyword3',
      },
    ];
    const query = 'test query with keyword1 and keyword2';

    const extractedKeywords = keywordService.extractKeywords(papers, query);

    expect(extractedKeywords).toEqual([
      { keyword: 'test', count: 2 },
      { keyword: 'query', count: 0 },
      { keyword: 'keyword1', count: 2 },
      { keyword: 'keyword2', count: 1 },
    ]);
  });
});
