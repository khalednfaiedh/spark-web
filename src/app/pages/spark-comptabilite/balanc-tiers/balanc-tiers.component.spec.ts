import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BalancTiersComponent } from './balanc-tiers.component';

describe('BalancTiersComponent', () => {
  let component: BalancTiersComponent;
  let fixture: ComponentFixture<BalancTiersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BalancTiersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BalancTiersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
