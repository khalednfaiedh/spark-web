import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PosteChargeComponent } from './poste-charge.component';

describe('PosteChargeComponent', () => {
  let component: PosteChargeComponent;
  let fixture: ComponentFixture<PosteChargeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PosteChargeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PosteChargeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
