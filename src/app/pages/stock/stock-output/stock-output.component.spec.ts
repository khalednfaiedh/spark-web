import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StockOutputComponent } from './stock-output.component';

describe('StockOutputComponent', () => {
  let component: StockOutputComponent;
  let fixture: ComponentFixture<StockOutputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StockOutputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StockOutputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
