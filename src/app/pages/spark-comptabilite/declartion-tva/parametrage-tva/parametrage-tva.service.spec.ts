import { TestBed } from '@angular/core/testing';

import { ParametrageTvaService } from './parametrage-tva.service';

describe('ParametrageTvaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ParametrageTvaService = TestBed.get(ParametrageTvaService);
    expect(service).toBeTruthy();
  });
});
