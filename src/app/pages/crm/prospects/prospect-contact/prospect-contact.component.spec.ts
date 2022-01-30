import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProspectContactComponent } from './prospect-contact.component';

describe('ProspectContactComponent', () => {
  let component: ProspectContactComponent;
  let fixture: ComponentFixture<ProspectContactComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProspectContactComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProspectContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
