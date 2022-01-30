import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowAdresseLivraisonClientComponent } from './show-adresse-livraison-client.component';

describe('ShowAdresseLivraisonClientComponent', () => {
  let component: ShowAdresseLivraisonClientComponent;
  let fixture: ComponentFixture<ShowAdresseLivraisonClientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowAdresseLivraisonClientComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowAdresseLivraisonClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
