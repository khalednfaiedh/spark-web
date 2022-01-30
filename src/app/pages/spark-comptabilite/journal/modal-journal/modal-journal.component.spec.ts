import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalJournalComponent } from './modal-journal.component';

describe('ModalJournalComponent', () => {
  let component: ModalJournalComponent;
  let fixture: ComponentFixture<ModalJournalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalJournalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalJournalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
