import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OuvrirJournalComponent } from './ouvrir-journal.component';

describe('OuvrirJournalComponent', () => {
  let component: OuvrirJournalComponent;
  let fixture: ComponentFixture<OuvrirJournalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OuvrirJournalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OuvrirJournalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
