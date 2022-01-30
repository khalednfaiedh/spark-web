import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormAvanceMensComponent } from './form-avance-mens.component';

describe('FormAvanceMensComponent', () => {
  let component: FormAvanceMensComponent;
  let fixture: ComponentFixture<FormAvanceMensComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormAvanceMensComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormAvanceMensComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
