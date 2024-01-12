import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaycreateComponent } from './playcreate.component';

describe('PlaycreateComponent', () => {
  let component: PlaycreateComponent;
  let fixture: ComponentFixture<PlaycreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlaycreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlaycreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
