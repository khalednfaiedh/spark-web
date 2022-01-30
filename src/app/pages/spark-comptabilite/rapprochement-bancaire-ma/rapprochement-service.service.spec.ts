import { TestBed } from '@angular/core/testing';

import { RapprochementServiceService } from './rapprochement-service.service';

describe('RapprochementServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RapprochementServiceService = TestBed.get(RapprochementServiceService);
    expect(service).toBeTruthy();
  });
});
