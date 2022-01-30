import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowPlanGeneralComponent } from './show-plan-general.component';

describe('ShowPlanGeneralComponent', () => {
  let component: ShowPlanGeneralComponent;
  let fixture: ComponentFixture<ShowPlanGeneralComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowPlanGeneralComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowPlanGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
