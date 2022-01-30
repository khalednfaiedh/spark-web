import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatpageComponent } from './statpage.component';

describe('StatpageComponent', () => {
  let component: StatpageComponent;
  let fixture: ComponentFixture<StatpageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatpageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
