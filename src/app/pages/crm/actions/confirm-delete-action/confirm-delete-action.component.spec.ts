import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmDeleteActionComponent } from './confirm-delete-action.component';

describe('ConfirmDeleteActionComponent', () => {
  let component: ConfirmDeleteActionComponent;
  let fixture: ComponentFixture<ConfirmDeleteActionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmDeleteActionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmDeleteActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
