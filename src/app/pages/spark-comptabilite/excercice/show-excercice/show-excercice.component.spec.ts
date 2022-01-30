import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowExcerciceComponent } from './show-excercice.component';

describe('ShowExcerciceComponent', () => {
  let component: ShowExcerciceComponent;
  let fixture: ComponentFixture<ShowExcerciceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowExcerciceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowExcerciceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
