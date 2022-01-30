import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RatioRentabiliteComponent } from './ratio-rentabilite.component';

describe('RatioRentabiliteComponent', () => {
  let component: RatioRentabiliteComponent;
  let fixture: ComponentFixture<RatioRentabiliteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RatioRentabiliteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RatioRentabiliteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
