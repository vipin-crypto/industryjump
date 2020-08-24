import { TestBed } from '@angular/core/testing';

import { GetInterceptorService } from './get-interceptor.service';

describe('GetInterceptorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GetInterceptorService = TestBed.get(GetInterceptorService);
    expect(service).toBeTruthy();
  });
});
