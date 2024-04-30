import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { SearchService } from '../../services/search.service';
import { LogoComponent } from '../logo/logo.component';
import { ResultCardComponent } from '../result-card/result-card.component';
import { SearchIconComponent } from '../icons/search-icon/search-icon.component';
import { KeywordChartComponent } from '../keyword-chart/keyword-chart.component';
import { SearchHeaderComponent } from './search-header.component';
import { stubPaper } from '../../../testing/stubs';
import { BehaviorSubject } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';

describe('SearchHeaderComponent', () => {
  let component: SearchHeaderComponent;
  let fixture: ComponentFixture<SearchHeaderComponent>;
  let searchService: SearchService;
  let router: Router;
  let activatedRoute: ActivatedRoute;

  const queryParamsSubject = new BehaviorSubject({});
  const dataSubject = new BehaviorSubject({});

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchHeaderComponent, HttpClientModule],
      providers: [
        SearchService,
        {
          provide: ActivatedRoute,
          useValue: {
            queryParams: queryParamsSubject.asObservable(),
            data: dataSubject.asObservable(),
          },
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchHeaderComponent);
    component = fixture.componentInstance;
    searchService = TestBed.inject(SearchService);
    router = TestBed.inject(Router);
    activatedRoute = TestBed.inject(ActivatedRoute);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should update the search input when query params change', () => {
    const params = { q: 'test query' };
    queryParamsSubject.next(params);

    expect(searchService.searchInput()).toBe('test query');
  });

  it('should update the search results when data changes', () => {
    const results = [{ ...stubPaper, id: 1, title: 'Result 1' }];
    dataSubject.next({
      searchResults: results,
    });

    expect(searchService.results()).toEqual(results);
  });

  it('should navigate with query params when onSearch is called', () => {
    const navigateSpy = spyOn(router, 'navigate');
    searchService.searchInput.set('test query');
    searchService.numPapers.set(20);

    component.onSearch();

    expect(navigateSpy).toHaveBeenCalledWith([], {
      relativeTo: jasmine.any(Object),
      queryParams: { q: 'test query', limit: 20 },
      queryParamsHandling: 'merge',
    });
  });

  // Add more test cases as needed
});
