import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalParametreTvaComponent } from './modal-parametre-tva.component';

describe('ModalParametreTvaComponent', () => {
  let component: ModalParametreTvaComponent;
  let fixture: ComponentFixture<ModalParametreTvaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalParametreTvaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalParametreTvaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
