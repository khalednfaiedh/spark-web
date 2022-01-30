import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalPlanTiersComponent } from './modal-plan-tiers.component';

describe('ModalPlanTiersComponent', () => {
  let component: ModalPlanTiersComponent;
  let fixture: ComponentFixture<ModalPlanTiersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalPlanTiersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalPlanTiersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
