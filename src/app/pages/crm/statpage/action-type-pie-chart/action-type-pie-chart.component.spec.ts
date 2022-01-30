import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionTypePieChartComponent } from './action-type-pie-chart.component';

describe('ActionTypePieChartComponent', () => {
  let component: ActionTypePieChartComponent;
  let fixture: ComponentFixture<ActionTypePieChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActionTypePieChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionTypePieChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
