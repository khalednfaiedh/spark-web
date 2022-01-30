import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowTarifsDeVenteComponent } from './show-tarifs-de-vente.component';

describe('ShowTarifsDeVenteComponent', () => {
  let component: ShowTarifsDeVenteComponent;
  let fixture: ComponentFixture<ShowTarifsDeVenteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowTarifsDeVenteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowTarifsDeVenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
