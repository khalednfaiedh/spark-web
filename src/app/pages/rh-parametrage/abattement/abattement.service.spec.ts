import { TestBed } from '@angular/core/testing';

import { AbattementService } from './abattement.service';

describe('AbattementService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AbattementService = TestBed.get(AbattementService);
    expect(service).toBeTruthy();
  });
});
