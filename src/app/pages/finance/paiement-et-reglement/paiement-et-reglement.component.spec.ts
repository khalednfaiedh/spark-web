import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaiementEtReglementComponent } from './paiement-et-reglement.component';

describe('PaiementEtReglementComponent', () => {
  let component: PaiementEtReglementComponent;
  let fixture: ComponentFixture<PaiementEtReglementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaiementEtReglementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaiementEtReglementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
