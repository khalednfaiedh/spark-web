import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteProspectComponent } from './delete-prospect.component';

describe('DeleteProspectComponent', () => {
  let component: DeleteProspectComponent;
  let fixture: ComponentFixture<DeleteProspectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteProspectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteProspectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
