import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchService } from '../../services/search.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HomeComponent } from './home.component';
import { By } from '@angular/platform-browser';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let searchService: SearchService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeComponent, RouterModule, HttpClientTestingModule],
      providers: [
        SearchService,
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: { params: {} },
          },
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    searchService = TestBed.inject(SearchService);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render the logo', () => {
    const logoElement = fixture.debugElement.query(By.css('pv-logo'));
    expect(logoElement).toBeTruthy();
    expect(logoElement.nativeElement.getAttribute('size')).toBe('lg');
  });

  it('should update the search input', () => {
    const inputElement = fixture.debugElement.query(By.css('input'));
    inputElement.nativeElement.value = 'test query';
    inputElement.nativeElement.dispatchEvent(new Event('input'));
    expect(searchService.searchInput()).toBe('test query');
  });

  it('should navigate to the search page on Enter key press', () => {
    const spy = spyOn(router, 'navigate');
    const inputElement = fixture.debugElement.query(By.css('input'));
    inputElement.nativeElement.value = 'test query';
    inputElement.nativeElement.dispatchEvent(new Event('input'));
    inputElement.triggerEventHandler('keydown.enter', {});
    expect(spy).toHaveBeenCalledWith(['/search'], {
      queryParams: { q: 'test query' },
    });
  });
});
