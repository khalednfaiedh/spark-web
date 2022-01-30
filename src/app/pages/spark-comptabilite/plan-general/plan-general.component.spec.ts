import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanGeneralComponent } from './plan-general.component';

describe('PlanGeneralComponent', () => {
  let component: PlanGeneralComponent;
  let fixture: ComponentFixture<PlanGeneralComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlanGeneralComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
