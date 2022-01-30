import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalLigneComponent } from './modal-ligne.component';

describe('ModalLigneComponent', () => {
  let component: ModalLigneComponent;
  let fixture: ComponentFixture<ModalLigneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalLigneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalLigneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
