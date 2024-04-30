import { TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { Result } from '../interfaces/api.interfaces';
import { CoreApiService } from './core-api.service';
import { SearchService } from './search.service';
import { stubPaper } from '../../testing/stubs';

describe('SearchService', () => {
  let searchService: SearchService;
  let coreApiServiceSpy: jasmine.SpyObj<CoreApiService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('CoreApiService', ['fetchPapers']);

    TestBed.configureTestingModule({
      providers: [SearchService, { provide: CoreApiService, useValue: spy }],
    });

    searchService = TestBed.inject(SearchService);
    coreApiServiceSpy = TestBed.inject(
      CoreApiService
    ) as jasmine.SpyObj<CoreApiService>;
  });

  it('should be created', () => {
    expect(searchService).toBeTruthy();
  });

  it('should have initial values', () => {
    expect(searchService.searchInput()).toBe('drone');
    expect(searchService.numPapers()).toBe(10);
    expect(searchService.results()).toEqual([]);
  });

  it('should call fetchPapers with the correct parameters', () => {
    const mockResults: Result[] = [
      { ...stubPaper, id: 1, title: 'Paper 1' },
      { ...stubPaper, id: 2, title: 'Paper 2' },
    ];
    coreApiServiceSpy.fetchPapers.and.returnValue(of(mockResults));

    searchService.searchPapers().subscribe((results) => {
      expect(results).toEqual(mockResults);
    });

    expect(coreApiServiceSpy.fetchPapers).toHaveBeenCalledWith({
      q: 'drone',
      limit: 10,
    });
  });

  it('should update the search input and call fetchPapers', () => {
    const mockResults: Result[] = [
      { ...stubPaper, id: 3, title: 'Paper 3' },
      { ...stubPaper, id: 4, title: 'Paper 4' },
    ];
    coreApiServiceSpy.fetchPapers.and.returnValue(of(mockResults));

    searchService.searchInput.set('new search');
    searchService.searchPapers().subscribe((results) => {
      expect(results).toEqual(mockResults);
    });

    expect(coreApiServiceSpy.fetchPapers).toHaveBeenCalledWith({
      q: 'new search',
      limit: 10,
    });
  });

  it('should update the number of papers and call fetchPapers', () => {
    const mockResults: Result[] = [
      { ...stubPaper, id: 5, title: 'Paper 5' },
      { ...stubPaper, id: 6, title: 'Paper 6' },
    ];
    coreApiServiceSpy.fetchPapers.and.returnValue(of(mockResults));

    searchService.numPapers.set(20);
    searchService.searchPapers().subscribe((results) => {
      expect(results).toEqual(mockResults);
    });

    expect(coreApiServiceSpy.fetchPapers).toHaveBeenCalledWith({
      q: 'drone',
      limit: 20,
    });
  });
});
