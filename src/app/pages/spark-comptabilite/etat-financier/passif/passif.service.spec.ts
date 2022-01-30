import { TestBed } from '@angular/core/testing';

import { PassifService } from './passif.service';

describe('PassifService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PassifService = TestBed.get(PassifService);
    expect(service).toBeTruthy();
  });
});
