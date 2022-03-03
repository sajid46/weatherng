import { TestBed } from '@angular/core/testing';

import { FirstInterceptorService } from './first-interceptor.service';

describe('FirstInterceptorService', () => {
  let service: FirstInterceptorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FirstInterceptorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
