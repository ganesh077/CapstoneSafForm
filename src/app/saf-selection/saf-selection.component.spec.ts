import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SafSelectionComponent } from './saf-selection.component';

describe('SafSelectionComponent', () => {
  let component: SafSelectionComponent;
  let fixture: ComponentFixture<SafSelectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SafSelectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SafSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
