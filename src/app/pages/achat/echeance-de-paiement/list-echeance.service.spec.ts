import { TestBed } from '@angular/core/testing';

import { ListEcheanceService } from './list-echeance.service';

describe('ListEcheanceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ListEcheanceService = TestBed.get(ListEcheanceService);
    expect(service).toBeTruthy();
  });
});
