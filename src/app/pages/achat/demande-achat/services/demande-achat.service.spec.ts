import { TestBed } from '@angular/core/testing';

import { DemandeAchatService } from './demande-achat.service';

describe('DemandeAchatService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DemandeAchatService = TestBed.get(DemandeAchatService);
    expect(service).toBeTruthy();
  });
});
