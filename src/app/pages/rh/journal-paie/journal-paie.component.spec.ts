import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JournalPaieComponent } from './journal-paie.component';

describe('JournalPaieComponent', () => {
  let component: JournalPaieComponent;
  let fixture: ComponentFixture<JournalPaieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JournalPaieComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JournalPaieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
