import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormAvanceComponent } from './form-avance.component';

describe('FormAvanceComponent', () => {
  let component: FormAvanceComponent;
  let fixture: ComponentFixture<FormAvanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormAvanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormAvanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
