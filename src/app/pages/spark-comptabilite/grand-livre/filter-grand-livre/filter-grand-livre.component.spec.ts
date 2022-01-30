import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterGrandLIvreComponent } from './filter-grand-livre.component';

describe('FilterGrandLIvreComponent', () => {
  let component: FilterGrandLIvreComponent;
  let fixture: ComponentFixture<FilterGrandLIvreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilterGrandLIvreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterGrandLIvreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
