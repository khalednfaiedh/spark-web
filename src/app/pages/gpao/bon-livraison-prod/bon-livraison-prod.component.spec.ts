import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BonLivraisonProdComponent } from './bon-livraison-prod.component';

describe('BonLivraisonProdComponent', () => {
  let component: BonLivraisonProdComponent;
  let fixture: ComponentFixture<BonLivraisonProdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BonLivraisonProdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BonLivraisonProdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
