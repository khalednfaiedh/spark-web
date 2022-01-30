import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RapprochementBancaireMAComponent } from './rapprochement-bancaire-ma.component';

describe('RapprochementBancaireMAComponent', () => {
  let component: RapprochementBancaireMAComponent;
  let fixture: ComponentFixture<RapprochementBancaireMAComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RapprochementBancaireMAComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RapprochementBancaireMAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
