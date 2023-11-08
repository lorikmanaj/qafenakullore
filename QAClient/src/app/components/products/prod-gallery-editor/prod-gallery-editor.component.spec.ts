import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdGalleryEditorComponent } from './prod-gallery-editor.component';

describe('ProdGalleryEditorComponent', () => {
  let component: ProdGalleryEditorComponent;
  let fixture: ComponentFixture<ProdGalleryEditorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProdGalleryEditorComponent]
    });
    fixture = TestBed.createComponent(ProdGalleryEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
