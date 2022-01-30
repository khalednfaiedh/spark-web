import { TestBed } from '@angular/core/testing';

import { RatioService } from './ratio.service';

describe('RatioService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RatioService = TestBed.get(RatioService);
    expect(service).toBeTruthy();
  });
});
