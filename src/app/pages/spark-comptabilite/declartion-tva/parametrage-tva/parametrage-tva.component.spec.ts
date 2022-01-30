import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParametrageTvaComponent } from './parametrage-tva.component';

describe('ParametrageTvaComponent', () => {
  let component: ParametrageTvaComponent;
  let fixture: ComponentFixture<ParametrageTvaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParametrageTvaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParametrageTvaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
