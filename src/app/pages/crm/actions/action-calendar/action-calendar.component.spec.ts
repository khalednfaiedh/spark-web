import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionCalendarComponent } from './action-calendar.component';

describe('ActionCalendarComponent', () => {
  let component: ActionCalendarComponent;
  let fixture: ComponentFixture<ActionCalendarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActionCalendarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
