import { TestBed } from '@angular/core/testing';

import { GameresultService } from './gameresult.service';

describe('GameresultService', () => {
  let service: GameresultService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GameresultService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
