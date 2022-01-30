import { TestBed } from '@angular/core/testing';

import { PosteChargeService } from './poste-charge.service';

describe('PosteChargeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PosteChargeService = TestBed.get(PosteChargeService);
    expect(service).toBeTruthy();
  });
});
