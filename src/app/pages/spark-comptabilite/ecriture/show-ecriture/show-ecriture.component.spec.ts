import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowEcritureComponent } from './show-ecriture.component';

describe('ShowEcritureComponent', () => {
  let component: ShowEcritureComponent;
  let fixture: ComponentFixture<ShowEcritureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowEcritureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowEcritureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
