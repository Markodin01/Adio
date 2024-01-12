import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GametypeComponent } from './gametype.component';

describe('GametypeComponent', () => {
  let component: GametypeComponent;
  let fixture: ComponentFixture<GametypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GametypeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GametypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
