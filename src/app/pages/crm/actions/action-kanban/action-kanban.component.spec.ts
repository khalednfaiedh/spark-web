import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionKanbanComponent } from './action-kanban.component';

describe('ActionKanbanComponent', () => {
  let component: ActionKanbanComponent;
  let fixture: ComponentFixture<ActionKanbanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActionKanbanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionKanbanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
