import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GalleryUploaderComponent } from './gallery-uploader.component';

describe('GalleryUploaderComponent', () => {
  let component: GalleryUploaderComponent;
  let fixture: ComponentFixture<GalleryUploaderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GalleryUploaderComponent]
    });
    fixture = TestBed.createComponent(GalleryUploaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
