import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEcritureComponent } from './modal-ecriture.component';

describe('ModalEcritureComponent', () => {
  let component: ModalEcritureComponent;
  let fixture: ComponentFixture<ModalEcritureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalEcritureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalEcritureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
