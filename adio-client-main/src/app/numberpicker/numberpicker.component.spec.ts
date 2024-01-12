import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NumberpickerComponent } from './numberpicker.component';

describe('NumberpickerComponent', () => {
  let component: NumberpickerComponent;
  let fixture: ComponentFixture<NumberpickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NumberpickerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NumberpickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
