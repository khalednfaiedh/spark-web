import { TestBed } from '@angular/core/testing';

import { ExcerciceService } from './excercice.service';

describe('ExcerciceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ExcerciceService = TestBed.get(ExcerciceService);
    expect(service).toBeTruthy();
  });
});
