import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RepportManuelleComponent } from './repport-manuelle.component';

describe('RepportManuelleComponent', () => {
  let component: RepportManuelleComponent;
  let fixture: ComponentFixture<RepportManuelleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RepportManuelleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RepportManuelleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
