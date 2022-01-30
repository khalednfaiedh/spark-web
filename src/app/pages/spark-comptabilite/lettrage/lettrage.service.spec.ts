import { TestBed } from '@angular/core/testing';

import { LettrageService } from './lettrage.service';

describe('LettrageService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LettrageService = TestBed.get(LettrageService);
    expect(service).toBeTruthy();
  });
});
