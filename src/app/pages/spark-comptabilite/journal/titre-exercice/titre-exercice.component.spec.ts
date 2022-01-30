import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TitreExerciceComponent } from './titre-exercice.component';

describe('TitreExerciceComponent', () => {
  let component: TitreExerciceComponent;
  let fixture: ComponentFixture<TitreExerciceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TitreExerciceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TitreExerciceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
