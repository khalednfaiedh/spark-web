import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowCoordonnesBancaireClientComponent } from './show-coordonnes-bancaire-client.component';

describe('ShowCoordonnesBancaireClientComponent', () => {
  let component: ShowCoordonnesBancaireClientComponent;
  let fixture: ComponentFixture<ShowCoordonnesBancaireClientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowCoordonnesBancaireClientComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowCoordonnesBancaireClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
