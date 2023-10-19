import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TagHelperComponent } from './tag-helper.component';

describe('TagHelperComponent', () => {
  let component: TagHelperComponent;
  let fixture: ComponentFixture<TagHelperComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TagHelperComponent]
    });
    fixture = TestBed.createComponent(TagHelperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
