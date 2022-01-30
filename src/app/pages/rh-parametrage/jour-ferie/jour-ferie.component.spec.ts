import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JourFerieComponent } from './jour-ferie.component';

describe('JourFerieComponent', () => {
  let component: JourFerieComponent;
  let fixture: ComponentFixture<JourFerieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JourFerieComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JourFerieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
