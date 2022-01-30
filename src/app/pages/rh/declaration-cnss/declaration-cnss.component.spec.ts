import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeclarationCNSSComponent } from './declaration-cnss.component';

describe('DeclarationCNSSComponent', () => {
  let component: DeclarationCNSSComponent;
  let fixture: ComponentFixture<DeclarationCNSSComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeclarationCNSSComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeclarationCNSSComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
