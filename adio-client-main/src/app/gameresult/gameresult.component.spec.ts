import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameresultComponent } from './gameresult.component';

describe('GameresultComponent', () => {
  let component: GameresultComponent;
  let fixture: ComponentFixture<GameresultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GameresultComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GameresultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
