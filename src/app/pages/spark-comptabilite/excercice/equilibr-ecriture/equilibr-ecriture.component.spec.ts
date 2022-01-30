import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EquilibrEcritureComponent } from './equilibr-ecriture.component';

describe('EquilibrEcritureComponent', () => {
  let component: EquilibrEcritureComponent;
  let fixture: ComponentFixture<EquilibrEcritureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EquilibrEcritureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EquilibrEcritureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
