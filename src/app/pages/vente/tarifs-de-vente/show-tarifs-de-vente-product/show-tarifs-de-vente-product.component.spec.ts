import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowTarifsDeVenteProductComponent } from './show-tarifs-de-vente-product.component';

describe('ShowTarifsDeVenteProductComponent', () => {
  let component: ShowTarifsDeVenteProductComponent;
  let fixture: ComponentFixture<ShowTarifsDeVenteProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowTarifsDeVenteProductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowTarifsDeVenteProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
