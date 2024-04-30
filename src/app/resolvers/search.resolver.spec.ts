import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot } from '@angular/router';
import { of } from 'rxjs';
import { SearchService } from '../services/search.service';
import { SearchResolver } from './search.resolver';

describe('SearchResolver', () => {
  let resolver: SearchResolver;
  let searchService: SearchService;
  let activatedRouteSnapshot: ActivatedRouteSnapshot;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        SearchResolver,
        {
          provide: SearchService,
          useValue: {
            searchInput: { set: jasmine.createSpy('set') },
            searchPapers: jasmine
              .createSpy('searchPapers')
              .and.returnValue(of([])),
          },
        },
      ],
    });

    resolver = TestBed.inject(SearchResolver);
    searchService = TestBed.inject(SearchService);
    activatedRouteSnapshot = new ActivatedRouteSnapshot();
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });

  it('should set the search input and return search results', () => {
    const searchTerm = 'test query';
    activatedRouteSnapshot.queryParams = { q: searchTerm };

    const results = [{ id: 1, title: 'Result 1' }];
    (searchService.searchPapers as jasmine.Spy).and.returnValue(of(results));

    resolver.resolve(activatedRouteSnapshot).subscribe((data) => {
      expect(data).toEqual(results);
      expect(searchService.searchInput.set).toHaveBeenCalledWith(searchTerm);
      expect(searchService.searchPapers).toHaveBeenCalled();
    });
  });
});
