import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeclartionTVAComponent } from './declartion-tva.component';

describe('DeclartionTVAComponent', () => {
  let component: DeclartionTVAComponent;
  let fixture: ComponentFixture<DeclartionTVAComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeclartionTVAComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeclartionTVAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
