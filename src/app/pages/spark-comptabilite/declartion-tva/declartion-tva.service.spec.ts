import { TestBed } from '@angular/core/testing';

import { DeclartionTVAService } from './declartion-tva.service';

describe('DeclartionTVAService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DeclartionTVAService = TestBed.get(DeclartionTVAService);
    expect(service).toBeTruthy();
  });
});
