import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChoisireExercicePlanTierComponent } from './choisire-exercice-plan-tier.component';

describe('ChoisireExercicePlanTierComponent', () => {
  let component: ChoisireExercicePlanTierComponent;
  let fixture: ComponentFixture<ChoisireExercicePlanTierComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChoisireExercicePlanTierComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChoisireExercicePlanTierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
