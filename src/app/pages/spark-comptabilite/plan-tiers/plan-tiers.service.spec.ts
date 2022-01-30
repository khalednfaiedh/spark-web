import { TestBed } from '@angular/core/testing';

import { PlanTiersService } from './plan-tiers.service';

describe('PlanTiersService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PlanTiersService = TestBed.get(PlanTiersService);
    expect(service).toBeTruthy();
  });
});
