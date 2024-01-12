import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseUserNameComponent } from './choose-user-name.component';

describe('ChooseUserNameComponent', () => {
  let component: ChooseUserNameComponent;
  let fixture: ComponentFixture<ChooseUserNameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChooseUserNameComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChooseUserNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
