import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanTiersComponent } from './plan-tiers.component';

describe('PlanTiersComponent', () => {
  let component: PlanTiersComponent;
  let fixture: ComponentFixture<PlanTiersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlanTiersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanTiersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
