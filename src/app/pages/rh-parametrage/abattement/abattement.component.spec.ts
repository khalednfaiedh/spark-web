import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AbattementComponent } from './abattement.component';

describe('AbattementComponent', () => {
  let component: AbattementComponent;
  let fixture: ComponentFixture<AbattementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AbattementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AbattementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
