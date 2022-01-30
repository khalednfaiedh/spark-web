import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalPosteChargeComponent } from './modal-poste-charge.component';

describe('ModalPosteChargeComponent', () => {
  let component: ModalPosteChargeComponent;
  let fixture: ComponentFixture<ModalPosteChargeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalPosteChargeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalPosteChargeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
