import { TestBed } from '@angular/core/testing';

import { ActifService } from './actif.service';

describe('ActifService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ActifService = TestBed.get(ActifService);
    expect(service).toBeTruthy();
  });
});
