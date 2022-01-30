import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowVirementComponent } from './show-virement.component';

describe('ShowVirementComponent', () => {
  let component: ShowVirementComponent;
  let fixture: ComponentFixture<ShowVirementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowVirementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowVirementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
