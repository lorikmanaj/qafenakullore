import { TestBed } from '@angular/core/testing';

import { VarietySelectionService } from './variety-selection.service';

describe('VarietySelectionService', () => {
  let service: VarietySelectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VarietySelectionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
