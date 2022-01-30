import { TestBed } from '@angular/core/testing';

import { EtatFinancierService } from './etat-financier.service';

describe('EtatFinancierService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EtatFinancierService = TestBed.get(EtatFinancierService);
    expect(service).toBeTruthy();
  });
});
