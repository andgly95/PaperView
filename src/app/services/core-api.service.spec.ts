import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { CoreApiService } from './core-api.service';
import { APIResponse, Result } from '../interfaces/api.interfaces';

describe('CoreApiService', () => {
  let service: CoreApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CoreApiService],
    });
    service = TestBed.inject(CoreApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch papers', () => {
    const mockResponse: APIResponse = {
      totalHits: 2,
      limit: 10,
      offset: 0,
      results: [
        { id: 1, title: 'Paper 1' },
        { id: 2, title: 'Paper 2' },
      ] as Result[],
    };

    service.fetchPapers({ q: 'test', limit: 10 }).subscribe((results) => {
      expect(results.length).toBe(2);
      expect(results[0].id).toBe(1);
      expect(results[1].id).toBe(2);
    });

    const req = httpMock.expectOne(
      'https://api.core.ac.uk/v3/search/works?q=test&limit=10'
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });
});
