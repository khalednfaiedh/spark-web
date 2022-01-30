import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoriqueActionComponent } from './historique-action.component';

describe('HistoriqueActionComponent', () => {
  let component: HistoriqueActionComponent;
  let fixture: ComponentFixture<HistoriqueActionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistoriqueActionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoriqueActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
