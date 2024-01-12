import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerstabComponent } from './playerstab.component';

describe('PlayerstabComponent', () => {
  let component: PlayerstabComponent;
  let fixture: ComponentFixture<PlayerstabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlayerstabComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlayerstabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
