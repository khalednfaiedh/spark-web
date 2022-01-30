import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalImputationComponent } from './modal-imputation.component';

describe('ModalImputationComponent', () => {
  let component: ModalImputationComponent;
  let fixture: ComponentFixture<ModalImputationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalImputationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalImputationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
