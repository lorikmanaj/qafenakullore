import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdReviewEditorComponent } from './prod-review-editor.component';

describe('ProdReviewEditorComponent', () => {
  let component: ProdReviewEditorComponent;
  let fixture: ComponentFixture<ProdReviewEditorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProdReviewEditorComponent]
    });
    fixture = TestBed.createComponent(ProdReviewEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
