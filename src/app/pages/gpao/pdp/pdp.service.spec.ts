import { TestBed } from '@angular/core/testing';

import { PdpService } from './pdp.service';

describe('PdpService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PdpService = TestBed.get(PdpService);
    expect(service).toBeTruthy();
  });
});
