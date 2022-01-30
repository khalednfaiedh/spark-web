import { TestBed } from '@angular/core/testing';

import { EnfantServiceService } from './enfant-service.service';

describe('EnfantServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EnfantServiceService = TestBed.get(EnfantServiceService);
    expect(service).toBeTruthy();
  });
});
