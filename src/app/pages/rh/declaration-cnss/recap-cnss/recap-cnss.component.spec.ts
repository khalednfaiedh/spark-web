import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecapCNSSComponent } from './recap-cnss.component';

describe('RecapCNSSComponent', () => {
  let component: RecapCNSSComponent;
  let fixture: ComponentFixture<RecapCNSSComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecapCNSSComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecapCNSSComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
