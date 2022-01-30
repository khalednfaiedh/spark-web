import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalUniteTransactionComponent } from './modal-unite-transaction.component';

describe('ModalUniteTransactionComponent', () => {
  let component: ModalUniteTransactionComponent;
  let fixture: ComponentFixture<ModalUniteTransactionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalUniteTransactionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalUniteTransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
