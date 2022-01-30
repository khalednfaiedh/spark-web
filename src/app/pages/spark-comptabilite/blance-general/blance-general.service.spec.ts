import { TestBed } from '@angular/core/testing';

import { BlanceGeneralService } from './blance-general.service';

describe('BlanceGeneralService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BlanceGeneralService = TestBed.get(BlanceGeneralService);
    expect(service).toBeTruthy();
  });
});
