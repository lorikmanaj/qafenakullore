import { Injectable } from '@angular/core';
import { CartItem } from 'src/app/models/cartItem';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  private finalizedItems: CartItem[] = [];

  constructor() {

  }

  setFinalizedItems(items: CartItem[]) {
    this.finalizedItems = items;
  }

  getFinalizedItems(): CartItem[] {
    return this.finalizedItems;
  }
}
