import { TestBed } from '@angular/core/testing';

import { QuantityProductServiceService } from './quantity-product-service.service';

describe('QuantityProductServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: QuantityProductServiceService = TestBed.get(QuantityProductServiceService);
    expect(service).toBeTruthy();
  });
});
