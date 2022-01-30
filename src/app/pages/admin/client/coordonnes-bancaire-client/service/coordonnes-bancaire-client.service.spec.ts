import { TestBed } from '@angular/core/testing';

import { CoordonnesBancaireClientService } from './coordonnes-bancaire-client.service';

describe('CoordonnesBancaireClientService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CoordonnesBancaireClientService = TestBed.get(CoordonnesBancaireClientService);
    expect(service).toBeTruthy();
  });
});
