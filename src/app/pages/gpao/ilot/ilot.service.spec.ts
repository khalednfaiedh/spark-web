import { TestBed } from '@angular/core/testing';

import { IlotService } from './ilot.service';

describe('IlotService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: IlotService = TestBed.get(IlotService);
    expect(service).toBeTruthy();
  });
});
