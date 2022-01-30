import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BalanceImportComponent } from './balance-import.component';

describe('BalanceImportComponent', () => {
  let component: BalanceImportComponent;
  let fixture: ComponentFixture<BalanceImportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BalanceImportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BalanceImportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
