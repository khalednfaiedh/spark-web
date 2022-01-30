import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEtatfinancierComponent } from './modal-etatfinancier.component';

describe('ModalEtatfinancierComponent', () => {
  let component: ModalEtatfinancierComponent;
  let fixture: ComponentFixture<ModalEtatfinancierComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalEtatfinancierComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalEtatfinancierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
