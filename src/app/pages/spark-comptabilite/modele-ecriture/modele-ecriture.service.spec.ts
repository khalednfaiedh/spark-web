import { TestBed } from '@angular/core/testing';

import { ModeleEcritureService } from './modele-ecriture.service';

describe('ModeleEcritureService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ModeleEcritureService = TestBed.get(ModeleEcritureService);
    expect(service).toBeTruthy();
  });
});
