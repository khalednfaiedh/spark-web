import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StockEtatComponent } from './stock-etat.component';

describe('StockEtatComponent', () => {
  let component: StockEtatComponent;
  let fixture: ComponentFixture<StockEtatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StockEtatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StockEtatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
