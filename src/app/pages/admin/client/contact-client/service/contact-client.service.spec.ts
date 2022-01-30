import { TestBed } from '@angular/core/testing';

import { ContactClientService } from './contact-client.service';

describe('ContactClientService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ContactClientService = TestBed.get(ContactClientService);
    expect(service).toBeTruthy();
  });
});
