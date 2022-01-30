import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRegimeHoraireComponent } from './add-regime-horaire.component';

describe('AddRegimeHoraireComponent', () => {
  let component: AddRegimeHoraireComponent;
  let fixture: ComponentFixture<AddRegimeHoraireComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddRegimeHoraireComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddRegimeHoraireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
