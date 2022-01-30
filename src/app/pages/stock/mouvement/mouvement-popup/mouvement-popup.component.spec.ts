import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MouvementPopupComponent } from './mouvement-popup.component';

describe('MouvementPopupComponent', () => {
  let component: MouvementPopupComponent;
  let fixture: ComponentFixture<MouvementPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MouvementPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MouvementPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
