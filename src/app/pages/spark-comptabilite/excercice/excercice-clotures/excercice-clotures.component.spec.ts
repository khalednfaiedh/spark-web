import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExcerciceCloturesComponent } from './excercice-clotures.component';

describe('ExcerciceCloturesComponent', () => {
  let component: ExcerciceCloturesComponent;
  let fixture: ComponentFixture<ExcerciceCloturesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExcerciceCloturesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExcerciceCloturesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
