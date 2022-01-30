import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowSuiviDePaiementComponent } from './show-suivi-de-paiement.component';

describe('ShowSuiviDePaiementComponent', () => {
  let component: ShowSuiviDePaiementComponent;
  let fixture: ComponentFixture<ShowSuiviDePaiementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowSuiviDePaiementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowSuiviDePaiementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
