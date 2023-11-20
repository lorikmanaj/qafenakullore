import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, map, tap, throwError } from 'rxjs';
import { CartItem } from '../../models/cartItem';
import { ApiService } from '../global/api.service';
import { OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { User } from 'src/app/models/user';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartItemsSubject = new BehaviorSubject<CartItem[]>([]);
  cartItems$ = this.cartItemsSubject.asObservable();
  private cartId: number | null = null;

  constructor(private apiService: ApiService,
    private userService: UserService) { }

  initCartData(): void {
    this.userService.getCurrentUser().subscribe(
      (response: { user: any }) => {
        const user = response.user;
        if (user && user.userId) {
          this.userService.getCartId(user.userId).subscribe(
            (cartId) => {
              if (cartId) {
                this.cartId = cartId;
                this.getCartItems().subscribe(
                  (cartItems: CartItem[]) => {
                    // You can do something with cartItems if needed
                  },
                  (error: any) => {
                    console.error('Error fetching cart items:', error);
                  }
                );
              }
            },
            (error: any) => {
              console.error('Error fetching cartId:', error);
            }
          );
        }
      },
      (error: any) => {
        console.error('Error fetching current user:', error);
      }
    );
  }

  getCartItems(): Observable<CartItem[]> {
    // Make a GET request to retrieve cart items for the user from the server
    return this.apiService.get<CartItem[]>(`CartItems/${this.cartId}`).pipe(
      tap((cartItems) => {
        this.cartItemsSubject.next(cartItems);
      }),
      catchError((error) => {
        console.error('Error fetching cart items:', error);
        return throwError(error);
      })
    );
  }

  addToCart(productId: number) {
    if (this.cartId !== null) {
      const newItem: CartItem = {
        cartItemId: 0,
        cartId: this.cartId,
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
    } else {
      console.error('CartId is null. Handle this case appropriately.');
      // You might want to set a default cartId or show an error message.
    }
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
