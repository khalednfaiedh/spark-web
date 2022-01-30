import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupProdComponent } from './popup-prod.component';

describe('PopupProdComponent', () => {
  let component: PopupProdComponent;
  let fixture: ComponentFixture<PopupProdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopupProdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupProdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
