import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApopupComponent } from './apopup.component';

describe('ApopupComponent', () => {
  let component: ApopupComponent;
  let fixture: ComponentFixture<ApopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
