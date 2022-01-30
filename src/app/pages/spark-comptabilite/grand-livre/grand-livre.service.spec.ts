import { TestBed } from '@angular/core/testing';

import { GrandLivreService } from './grand-livre.service';

describe('GrandLivreService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GrandLivreService = TestBed.get(GrandLivreService);
    expect(service).toBeTruthy();
  });
});
