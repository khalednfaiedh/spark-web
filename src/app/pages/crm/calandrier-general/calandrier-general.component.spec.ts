import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalandrierGeneralComponent } from './calandrier-general.component';

describe('CalandrierGeneralComponent', () => {
  let component: CalandrierGeneralComponent;
  let fixture: ComponentFixture<CalandrierGeneralComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalandrierGeneralComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalandrierGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
