import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserProfitsComponent } from './user-profits.component';

describe('UserProfitsComponent', () => {
  let component: UserProfitsComponent;
  let fixture: ComponentFixture<UserProfitsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserProfitsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserProfitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
