import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpacesListComponent } from './spaces-list.component';

describe('SpacesListComponent', () => {
  let component: SpacesListComponent;
  let fixture: ComponentFixture<SpacesListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SpacesListComponent]
    });
    fixture = TestBed.createComponent(SpacesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
