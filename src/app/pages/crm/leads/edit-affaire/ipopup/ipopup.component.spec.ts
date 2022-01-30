import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IpopupComponent } from './ipopup.component';

describe('IpopupComponent', () => {
  let component: IpopupComponent;
  let fixture: ComponentFixture<IpopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IpopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IpopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
