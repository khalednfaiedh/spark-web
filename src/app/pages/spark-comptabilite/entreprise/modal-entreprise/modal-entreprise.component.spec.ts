import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEntrepriseComponent } from './modal-entreprise.component';

describe('ModalEntrepriseComponent', () => {
  let component: ModalEntrepriseComponent;
  let fixture: ComponentFixture<ModalEntrepriseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalEntrepriseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalEntrepriseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
