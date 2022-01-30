import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GrandLivreTiersComponent } from './grand-livre-tiers.component';

describe('GrandLivreTiersComponent', () => {
  let component: GrandLivreTiersComponent;
  let fixture: ComponentFixture<GrandLivreTiersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GrandLivreTiersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GrandLivreTiersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
