import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChoisirJournalComponent } from './choisir-journal.component';

describe('ChoisirJournalComponent', () => {
  let component: ChoisirJournalComponent;
  let fixture: ComponentFixture<ChoisirJournalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChoisirJournalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChoisirJournalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
