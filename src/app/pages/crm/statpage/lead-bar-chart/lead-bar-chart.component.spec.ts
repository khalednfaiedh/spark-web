import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeadBarChartComponent } from './lead-bar-chart.component';

describe('LeadBarChartComponent', () => {
  let component: LeadBarChartComponent;
  let fixture: ComponentFixture<LeadBarChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeadBarChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeadBarChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
