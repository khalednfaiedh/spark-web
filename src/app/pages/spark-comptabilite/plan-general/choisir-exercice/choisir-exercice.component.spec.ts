import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChoisirExerciceComponent } from './choisir-exercice.component';

describe('ChoisirExerciceComponent', () => {
  let component: ChoisirExerciceComponent;
  let fixture: ComponentFixture<ChoisirExerciceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChoisirExerciceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChoisirExerciceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
