import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionPieChartComponent } from './action-pie-chart.component';

describe('ActionPieChartComponent', () => {
  let component: ActionPieChartComponent;
  let fixture: ComponentFixture<ActionPieChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActionPieChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionPieChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
