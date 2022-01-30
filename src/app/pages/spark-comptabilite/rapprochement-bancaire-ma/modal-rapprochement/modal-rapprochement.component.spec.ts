import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalRapprochementComponent } from './modal-rapprochement.component';

describe('ModalRapprochementComponent', () => {
  let component: ModalRapprochementComponent;
  let fixture: ComponentFixture<ModalRapprochementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalRapprochementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalRapprochementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
