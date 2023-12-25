import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectionSectionComponent } from './collection-section.component';

describe('CollectionSectionComponent', () => {
  let component: CollectionSectionComponent;
  let fixture: ComponentFixture<CollectionSectionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CollectionSectionComponent]
    });
    fixture = TestBed.createComponent(CollectionSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
