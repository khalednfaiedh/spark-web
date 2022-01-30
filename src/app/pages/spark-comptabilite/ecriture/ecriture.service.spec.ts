import { TestBed } from '@angular/core/testing';

import { EcritureService } from './ecriture.service';

describe('EcritureService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EcritureService = TestBed.get(EcritureService);
    expect(service).toBeTruthy();
  });
});
