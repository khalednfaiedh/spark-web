import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JournalFilsComponent } from './journal-fils.component';

describe('JournalFilsComponent', () => {
  let component: JournalFilsComponent;
  let fixture: ComponentFixture<JournalFilsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JournalFilsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JournalFilsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
