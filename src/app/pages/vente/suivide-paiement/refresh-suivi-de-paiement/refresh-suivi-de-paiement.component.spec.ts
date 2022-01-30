import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RefreshSuiviDePaiementComponent } from './refresh-suivi-de-paiement.component';

describe('RefreshSuiviDePaiementComponent', () => {
  let component: RefreshSuiviDePaiementComponent;
  let fixture: ComponentFixture<RefreshSuiviDePaiementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RefreshSuiviDePaiementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RefreshSuiviDePaiementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
