import { TestBed } from '@angular/core/testing';

import { JoingameroomService } from './joingameroom.service';

describe('JoingameroomService', () => {
  let service: JoingameroomService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JoingameroomService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
