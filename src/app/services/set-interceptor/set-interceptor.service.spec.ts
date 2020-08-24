import { TestBed } from '@angular/core/testing';

import { SetInterceptorService } from './set-interceptor.service';

describe('SetInterceptorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SetInterceptorService = TestBed.get(SetInterceptorService);
    expect(service).toBeTruthy();
  });
});
