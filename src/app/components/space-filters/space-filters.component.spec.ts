import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpaceFiltersComponent } from './space-filters.component';

describe('SpaceFiltersComponent', () => {
  let component: SpaceFiltersComponent;
  let fixture: ComponentFixture<SpaceFiltersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SpaceFiltersComponent]
    });
    fixture = TestBed.createComponent(SpaceFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
