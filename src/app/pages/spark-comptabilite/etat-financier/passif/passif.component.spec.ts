import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PassifComponent } from './passif.component';

describe('PassifComponent', () => {
  let component: PassifComponent;
  let fixture: ComponentFixture<PassifComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PassifComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PassifComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
