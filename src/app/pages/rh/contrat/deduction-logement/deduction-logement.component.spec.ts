import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeductionLogementComponent } from './deduction-logement.component';

describe('DeductionLogementComponent', () => {
  let component: DeductionLogementComponent;
  let fixture: ComponentFixture<DeductionLogementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeductionLogementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeductionLogementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
