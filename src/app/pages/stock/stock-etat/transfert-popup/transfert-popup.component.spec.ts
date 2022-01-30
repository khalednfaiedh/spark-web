import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransfertPopupComponent } from './transfert-popup.component';

describe('TransfertPopupComponent', () => {
  let component: TransfertPopupComponent;
  let fixture: ComponentFixture<TransfertPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransfertPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransfertPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
