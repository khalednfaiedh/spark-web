import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RatioEquilibreFinancierComponent } from './ratio-equilibre-financier.component';

describe('RatioEquilibreFinancierComponent', () => {
  let component: RatioEquilibreFinancierComponent;
  let fixture: ComponentFixture<RatioEquilibreFinancierComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RatioEquilibreFinancierComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RatioEquilibreFinancierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
