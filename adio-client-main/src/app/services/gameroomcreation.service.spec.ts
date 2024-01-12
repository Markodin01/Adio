import { TestBed } from '@angular/core/testing';

import { GameroomcreationService } from './gameroomcreation.service';

describe('GameroomcreationService', () => {
  let service: GameroomcreationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GameroomcreationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
