import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LivreJournalGeneralComponent } from './livre-journal-general.component';

describe('LivreJournalGeneralComponent', () => {
  let component: LivreJournalGeneralComponent;
  let fixture: ComponentFixture<LivreJournalGeneralComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LivreJournalGeneralComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LivreJournalGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
