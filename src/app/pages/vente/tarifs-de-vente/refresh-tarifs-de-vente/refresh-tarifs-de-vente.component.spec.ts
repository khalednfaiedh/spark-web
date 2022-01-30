import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RefreshTarifsDeVenteComponent } from './refresh-tarifs-de-vente.component';

describe('RefreshTarifsDeVenteComponent', () => {
  let component: RefreshTarifsDeVenteComponent;
  let fixture: ComponentFixture<RefreshTarifsDeVenteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RefreshTarifsDeVenteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RefreshTarifsDeVenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
