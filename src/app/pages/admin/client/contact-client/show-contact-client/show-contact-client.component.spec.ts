import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowContactClientComponent } from './show-contact-client.component';

describe('ShowContactClientComponent', () => {
  let component: ShowContactClientComponent;
  let fixture: ComponentFixture<ShowContactClientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowContactClientComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowContactClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
