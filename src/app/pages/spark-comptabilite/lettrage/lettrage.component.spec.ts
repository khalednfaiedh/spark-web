import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LettrageComponent } from './lettrage.component';

describe('LettrageComponent', () => {
  let component: LettrageComponent;
  let fixture: ComponentFixture<LettrageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LettrageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LettrageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
