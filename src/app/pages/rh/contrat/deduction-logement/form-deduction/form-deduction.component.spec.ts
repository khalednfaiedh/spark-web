import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormDeductionComponent } from './form-deduction.component';

describe('FormDeductionComponent', () => {
  let component: FormDeductionComponent;
  let fixture: ComponentFixture<FormDeductionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormDeductionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormDeductionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
