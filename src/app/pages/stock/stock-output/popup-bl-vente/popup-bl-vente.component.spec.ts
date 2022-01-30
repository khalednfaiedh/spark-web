import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupBlVenteComponent } from './popup-bl-vente.component';

describe('PopupBlVenteComponent', () => {
  let component: PopupBlVenteComponent;
  let fixture: ComponentFixture<PopupBlVenteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopupBlVenteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupBlVenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
