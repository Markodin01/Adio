import { TestBed } from '@angular/core/testing';

import { DeezerapiService } from './deezerapi.service';

describe('DeezerapiService', () => {
  let service: DeezerapiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeezerapiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
