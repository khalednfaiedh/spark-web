import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TitreJournalComponent } from './titre-journal.component';

describe('TitreJournalComponent', () => {
  let component: TitreJournalComponent;
  let fixture: ComponentFixture<TitreJournalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TitreJournalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TitreJournalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
