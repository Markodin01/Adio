import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GamereadyComponent } from './gameready.component';

describe('GamereadyComponent', () => {
  let component: GamereadyComponent;
  let fixture: ComponentFixture<GamereadyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GamereadyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GamereadyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
