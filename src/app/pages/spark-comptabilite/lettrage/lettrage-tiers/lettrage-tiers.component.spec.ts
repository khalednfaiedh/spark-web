import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LettrageTiersComponent } from './lettrage-tiers.component';

describe('LettrageTiersComponent', () => {
  let component: LettrageTiersComponent;
  let fixture: ComponentFixture<LettrageTiersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LettrageTiersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LettrageTiersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
