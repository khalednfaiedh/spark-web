import { TestBed } from '@angular/core/testing';

import { LivreTiersService } from './livre-tiers.service';

describe('LivreTiersService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LivreTiersService = TestBed.get(LivreTiersService);
    expect(service).toBeTruthy();
  });
});
