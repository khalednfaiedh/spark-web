import { TestBed } from '@angular/core/testing';

import { PlanGeneralService } from './plan-general.service';

describe('PlanGeneralService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PlanGeneralService = TestBed.get(PlanGeneralService);
    expect(service).toBeTruthy();
  });
});
