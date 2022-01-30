import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DealBarComponent } from './deal-bar.component';

describe('DealBarComponent', () => {
  let component: DealBarComponent;
  let fixture: ComponentFixture<DealBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DealBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DealBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
