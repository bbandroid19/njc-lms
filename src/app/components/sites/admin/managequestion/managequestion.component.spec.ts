import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagequestionComponent } from './managequestion.component';

describe('ManagequestionComponent', () => {
  let component: ManagequestionComponent;
  let fixture: ComponentFixture<ManagequestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagequestionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagequestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
