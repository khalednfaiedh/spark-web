import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OnOffUserComponent } from './on-off-user.component';

describe('OnOffUserComponent', () => {
  let component: OnOffUserComponent;
  let fixture: ComponentFixture<OnOffUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OnOffUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OnOffUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
