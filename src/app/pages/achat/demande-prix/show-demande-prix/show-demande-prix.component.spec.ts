import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowDemandePrixComponent } from './show-demande-prix.component';

describe('ShowDemandePrixComponent', () => {
  let component: ShowDemandePrixComponent;
  let fixture: ComponentFixture<ShowDemandePrixComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowDemandePrixComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowDemandePrixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
