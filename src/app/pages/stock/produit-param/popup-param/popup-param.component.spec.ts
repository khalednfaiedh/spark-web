import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupParamComponent } from './popup-param.component';

describe('PopupParamComponent', () => {
  let component: PopupParamComponent;
  let fixture: ComponentFixture<PopupParamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopupParamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupParamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
