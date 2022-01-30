import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalGammeOperatoireComponent } from './modal-gamme-operatoire.component';

describe('ModalGammeOperatoireComponent', () => {
  let component: ModalGammeOperatoireComponent;
  let fixture: ComponentFixture<ModalGammeOperatoireComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalGammeOperatoireComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalGammeOperatoireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
