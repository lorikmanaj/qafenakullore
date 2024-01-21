import { TestBed } from '@angular/core/testing';

import { SliderItemsService } from './slider-items.service';

describe('SliderItemsService', () => {
  let service: SliderItemsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SliderItemsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
