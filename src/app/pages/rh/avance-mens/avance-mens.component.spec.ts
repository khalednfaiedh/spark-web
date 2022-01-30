import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AvanceMensComponent } from './avance-mens.component';

describe('AvanceMensComponent', () => {
  let component: AvanceMensComponent;
  let fixture: ComponentFixture<AvanceMensComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AvanceMensComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AvanceMensComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
