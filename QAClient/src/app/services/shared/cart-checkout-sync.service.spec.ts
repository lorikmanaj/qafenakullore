import { TestBed } from '@angular/core/testing';

import { CartCheckoutSyncService } from './cart-checkout-sync.service';

describe('CartCheckoutSyncService', () => {
  let service: CartCheckoutSyncService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CartCheckoutSyncService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
