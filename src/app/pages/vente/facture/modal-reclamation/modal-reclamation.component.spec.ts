import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalReclamationComponent } from './modal-reclamation.component';

describe('ModalReclamationComponent', () => {
  let component: ModalReclamationComponent;
  let fixture: ComponentFixture<ModalReclamationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalReclamationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalReclamationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
