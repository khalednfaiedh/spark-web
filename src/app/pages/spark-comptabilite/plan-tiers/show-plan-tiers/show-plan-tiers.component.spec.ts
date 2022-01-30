import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowPlanTiersComponent } from './show-plan-tiers.component';

describe('ShowPlanTiersComponent', () => {
  let component: ShowPlanTiersComponent;
  let fixture: ComponentFixture<ShowPlanTiersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowPlanTiersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowPlanTiersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
