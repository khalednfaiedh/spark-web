import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExcerciceComponent } from './excercice.component';

describe('ExcerciceComponent', () => {
  let component: ExcerciceComponent;
  let fixture: ComponentFixture<ExcerciceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExcerciceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExcerciceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
