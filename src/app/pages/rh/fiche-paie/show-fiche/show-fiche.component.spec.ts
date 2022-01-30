import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowFicheComponent } from './show-fiche.component';

describe('ShowFicheComponent', () => {
  let component: ShowFicheComponent;
  let fixture: ComponentFixture<ShowFicheComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowFicheComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowFicheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
