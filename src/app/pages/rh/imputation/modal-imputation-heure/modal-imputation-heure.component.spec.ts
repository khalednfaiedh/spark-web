import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalImputationHeureComponent } from './modal-imputation-heure.component';

describe('ModalImputationHeureComponent', () => {
  let component: ModalImputationHeureComponent;
  let fixture: ComponentFixture<ModalImputationHeureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalImputationHeureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalImputationHeureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
