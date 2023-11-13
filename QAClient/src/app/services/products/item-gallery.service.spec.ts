import { TestBed } from '@angular/core/testing';

import { ItemGalleryService } from './item-gallery.service';

describe('ItemGalleryService', () => {
  let service: ItemGalleryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ItemGalleryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
