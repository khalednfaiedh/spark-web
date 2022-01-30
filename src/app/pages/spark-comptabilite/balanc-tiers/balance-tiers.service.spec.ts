import { TestBed } from '@angular/core/testing';

import { BalanceTiersService } from './balance-tiers.service';

describe('BalanceTiersService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BalanceTiersService = TestBed.get(BalanceTiersService);
    expect(service).toBeTruthy();
  });
});
