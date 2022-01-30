import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExcerciceOuvertsComponent } from './excercice-ouverts.component';

describe('ExcerciceOuvertsComponent', () => {
  let component: ExcerciceOuvertsComponent;
  let fixture: ComponentFixture<ExcerciceOuvertsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExcerciceOuvertsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExcerciceOuvertsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
