import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalNomenclatureComponent } from './modal-nomenclature.component';

describe('ModalNomenclatureComponent', () => {
  let component: ModalNomenclatureComponent;
  let fixture: ComponentFixture<ModalNomenclatureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalNomenclatureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalNomenclatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
