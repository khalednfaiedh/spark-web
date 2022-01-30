import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalExcerciceComponent } from './modal-excercice.component';

describe('ModalExcerciceComponent', () => {
  let component: ModalExcerciceComponent;
  let fixture: ComponentFixture<ModalExcerciceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalExcerciceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalExcerciceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
