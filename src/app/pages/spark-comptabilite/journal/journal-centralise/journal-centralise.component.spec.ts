import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JournalCentraliseComponent } from './journal-centralise.component';

describe('JournalCentraliseComponent', () => {
  let component: JournalCentraliseComponent;
  let fixture: ComponentFixture<JournalCentraliseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JournalCentraliseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JournalCentraliseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
