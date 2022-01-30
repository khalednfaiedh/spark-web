import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalFourniseurCategorieComponent } from './modal-fourniseur-categorie.component';

describe('ModalFourniseurCategorieComponent', () => {
  let component: ModalFourniseurCategorieComponent;
  let fixture: ComponentFixture<ModalFourniseurCategorieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalFourniseurCategorieComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalFourniseurCategorieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
