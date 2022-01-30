import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmDemandeAchatComponent } from './confirm-demande-achat.component';

describe('ConfirmDemandeAchatComponent', () => {
  let component: ConfirmDemandeAchatComponent;
  let fixture: ComponentFixture<ConfirmDemandeAchatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmDemandeAchatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmDemandeAchatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
