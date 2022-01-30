import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalPlanGeneralComponent } from './modal-plan-general.component';

describe('ModalPlanGeneralComponent', () => {
  let component: ModalPlanGeneralComponent;
  let fixture: ComponentFixture<ModalPlanGeneralComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalPlanGeneralComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalPlanGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
