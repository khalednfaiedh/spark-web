import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContinuerapprochementComponent } from './continuerapprochement.component';

describe('ContinuerapprochementComponent', () => {
  let component: ContinuerapprochementComponent;
  let fixture: ComponentFixture<ContinuerapprochementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContinuerapprochementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContinuerapprochementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
