import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CartItem } from '../../models/cartItem';
import { ApiService } from '../global/api.service';
import { OnInit } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CartService implements OnInit {
  private cartItemsSubject = new BehaviorSubject<CartItem[]>([]);
  cartItems$ = this.cartItemsSubject.asObservable();

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    // Fetch the cart items initially
    this.getCartItems();
  }

  getCartItems(): void {
    // Make a GET request to retrieve cart items for the user from the server
    this.apiService.get<CartItem[]>('CartItems').subscribe(
      (cartItems) => {
        this.cartItemsSubject.next(cartItems);
      },
      (error) => {
        console.error('Error fetching cart items:', error);
      }
    );
  }

  addToCart(productId: number) {
    // Create a CartItem object with the productId and quantity
    const newItem: CartItem = {
      cartItemId: 0,
      cartId: ?,
      productId: productId,
      itemName: '', // You can set a default name or fetch it from the server
      quantity: 1,
      // other properties as needed
    };

    // Make a POST request to add the item to the server cart
    this.apiService.post<CartItem, CartItem>('CartItems', newItem).subscribe(
      (addedItem) => {
        const currentCartItems = this.cartItemsSubject.getValue();
        const existingItem = currentCartItems.find((item) => item.productId === addedItem.productId);

        if (existingItem) {
          existingItem.quantity++;
        } else {
          const updatedCartItems = [...currentCartItems, addedItem];
          this.cartItemsSubject.next(updatedCartItems);
        }
      },
      (error) => {
        console.error('Error adding item to cart:', error);
      }
    );
  }

  removeFromCart(cartItemId: number) {
    // Make a DELETE request to remove the item from the server cart
    this.apiService.delete(`CartItems/${cartItemId}`).subscribe(
      () => {
        const currentCartItems = this.cartItemsSubject.getValue();
        const updatedCartItems = currentCartItems.filter(
          (item) => item.cartItemId !== cartItemId
        );
        this.cartItemsSubject.next(updatedCartItems);
      },
      (error) => {
        console.error('Error removing item from cart:', error);
      }
    );
  }
}
