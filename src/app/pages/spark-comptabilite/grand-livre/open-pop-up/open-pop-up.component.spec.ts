import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenPopUpComponent } from './open-pop-up.component';

describe('OpenPopUpComponent', () => {
  let component: OpenPopUpComponent;
  let fixture: ComponentFixture<OpenPopUpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpenPopUpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpenPopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
