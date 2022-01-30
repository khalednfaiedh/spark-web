import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoordonnesBancaireClientComponent } from './coordonnes-bancaire-client.component';

describe('CoordonnesBancaireClientComponent', () => {
  let component: CoordonnesBancaireClientComponent;
  let fixture: ComponentFixture<CoordonnesBancaireClientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoordonnesBancaireClientComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoordonnesBancaireClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
