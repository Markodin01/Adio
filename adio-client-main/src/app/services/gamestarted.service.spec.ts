import { TestBed } from '@angular/core/testing';

import { GamestartedService } from './gamestarted.service';

describe('GamestartedService', () => {
  let service: GamestartedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GamestartedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
