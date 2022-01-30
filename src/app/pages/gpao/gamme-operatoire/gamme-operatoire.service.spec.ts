import { TestBed } from '@angular/core/testing';

import { GammeOperatoireService } from './gamme-operatoire.service';

describe('GammeOperatoireService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GammeOperatoireService = TestBed.get(GammeOperatoireService);
    expect(service).toBeTruthy();
  });
});
