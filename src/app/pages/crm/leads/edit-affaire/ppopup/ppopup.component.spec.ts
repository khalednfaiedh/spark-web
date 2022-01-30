import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PpopupComponent } from './ppopup.component';

describe('PpopupComponent', () => {
  let component: PpopupComponent;
  let fixture: ComponentFixture<PpopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PpopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PpopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
