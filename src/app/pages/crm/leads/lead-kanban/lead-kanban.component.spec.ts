import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeadKanbanComponent } from './lead-kanban.component';

describe('LeadKanbanComponent', () => {
  let component: LeadKanbanComponent;
  let fixture: ComponentFixture<LeadKanbanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeadKanbanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeadKanbanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
