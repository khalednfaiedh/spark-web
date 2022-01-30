import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupDemandeGpaoComponent } from './popup-demande-gpao.component';

describe('PopupDemandeGpaoComponent', () => {
  let component: PopupDemandeGpaoComponent;
  let fixture: ComponentFixture<PopupDemandeGpaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopupDemandeGpaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupDemandeGpaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
