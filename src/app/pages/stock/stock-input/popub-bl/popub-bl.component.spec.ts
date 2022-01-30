import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopubBlComponent } from './popub-bl.component';

describe('PopubBlComponent', () => {
  let component: PopubBlComponent;
  let fixture: ComponentFixture<PopubBlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopubBlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopubBlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
