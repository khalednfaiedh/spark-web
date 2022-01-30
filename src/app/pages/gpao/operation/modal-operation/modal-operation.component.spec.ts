import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalOperationComponent } from './modal-operation.component';

describe('ModalOperationComponent', () => {
  let component: ModalOperationComponent;
  let fixture: ComponentFixture<ModalOperationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalOperationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalOperationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
