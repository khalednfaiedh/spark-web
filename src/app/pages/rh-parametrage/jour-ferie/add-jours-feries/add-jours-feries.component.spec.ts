import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddJoursFeriesComponent } from './add-jours-feries.component';

describe('AddJoursFeriesComponent', () => {
  let component: AddJoursFeriesComponent;
  let fixture: ComponentFixture<AddJoursFeriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddJoursFeriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddJoursFeriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
