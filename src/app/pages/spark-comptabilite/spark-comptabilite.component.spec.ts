import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SparkComptabiliteComponent } from './spark-comptabilite.component';

describe('SparkComptabiliteComponent', () => {
  let component: SparkComptabiliteComponent;
  let fixture: ComponentFixture<SparkComptabiliteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SparkComptabiliteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SparkComptabiliteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
