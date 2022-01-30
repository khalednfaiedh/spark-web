import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NpopupComponent } from './npopup.component';

describe('NpopupComponent', () => {
  let component: NpopupComponent;
  let fixture: ComponentFixture<NpopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NpopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NpopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
