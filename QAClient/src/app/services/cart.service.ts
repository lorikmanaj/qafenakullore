import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ProductService } from './products/product.service';
import { Product } from 'src/app/models/product';
import { CartItem } from '../models/cartItem';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartItemsSubject = new BehaviorSubject<CartItem[]>([
    {
      productId: 1,
      itemName: 'Test 1',
      count: 1
    },
    {
      productId: 2,
      itemName: 'Test 2',
      count: 1
    }
  ]);
  cartItems$ = this.cartItemsSubject.asObservable();

  constructor(private productService: ProductService) { }

  addToCart(productId: number) {
    // Fetch product details from ProductService
    this.productService.getProducts().subscribe((products) => {
      const product = products.find((p) => p.productId === productId);

      if (product) {
        const currentCartItems = this.cartItemsSubject.getValue();
        const existingItem = currentCartItems.find((item) => item.productId === product.productId);

        if (existingItem) {
          existingItem.count++;
        } else {
          const newItem: CartItem = {
            productId: product.productId,
            itemName: product.name,
            count: 1
          };
          const updatedCartItems = [...currentCartItems, newItem];
          this.cartItemsSubject.next(updatedCartItems);
        }
      }
    });
  }

  removeFromCart(productId: number) {
    const currentCartItems = this.cartItemsSubject.getValue();
    const updatedCartItems = currentCartItems.filter(
      (item) => item.productId !== productId
    );
    this.cartItemsSubject.next(updatedCartItems);
  }

  getCartItems(): Observable<CartItem[]> {
    return this.cartItems$;
  }
}
