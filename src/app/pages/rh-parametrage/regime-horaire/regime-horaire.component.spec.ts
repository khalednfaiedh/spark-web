import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegimeHoraireComponent } from './regime-horaire.component';

describe('RegimeHoraireComponent', () => {
  let component: RegimeHoraireComponent;
  let fixture: ComponentFixture<RegimeHoraireComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegimeHoraireComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegimeHoraireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
