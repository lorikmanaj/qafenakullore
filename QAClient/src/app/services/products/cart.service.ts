import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';  // Import operators from 'rxjs/operators'
import { switchMap } from 'rxjs/operators';  // Import switchMap separately
import { CartItem } from '../../models/cartItem';
import { ApiService } from '../global/api.service';
import { UserService } from '../user.service';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartItemsSubject = new BehaviorSubject<CartItem[]>([]);
  cartItems$ = this.cartItemsSubject.asObservable();
  private cartId: number | null = null;

  constructor(private apiService: ApiService,
    private userService: UserService) {
    //this.initCartData();
  }

  initCartData(): void {
    this.userService.isAuthenticated$.subscribe((isAuthenticated) => {
      if (isAuthenticated) {
        this.loadCartItems();
      }
    });
  }

  private loadCartItems() {
    const userId = this.userService.getUserId();
    if (userId !== null) {
      this.getCartId(userId).pipe(
        switchMap((cartId) => {
          if (cartId !== null) {
            return this.getCartItems();
          } else {
            console.error('cartId is null');
            return throwError('cartId is null');
          }
        })
      ).subscribe(
        (cartItems: CartItem[]) => {
          this.cartItemsSubject.next(cartItems);
        },
        (error) => {
          console.error('Error fetching cart items:', error);
        }
      );
    } else {
      console.error('userId is null');
    }
  }

  getCartId(userId: string): Observable<number | null> {
    return this.apiService.get<number>(`Carts/${userId}`).pipe(
      tap((cartId) => {
        this.cartId = cartId;
      }),
      catchError((error) => {
        console.error('Error getting cartId:', error);
        return throwError(error);
      })
    );
  }

  getCartItems(): Observable<CartItem[]> {
    if (this.cartId !== null) {
      return this.apiService.get<CartItem[]>(`CartItems/${this.cartId}`).pipe(
        tap((cartItems) => {
          this.cartItemsSubject.next(cartItems);
        }),
        catchError((error) => {
          console.error('Error fetching cart items:', error);
          return throwError(error);
        })
      );
    } else {
      console.error('CartId is null. Cannot fetch cart items.');
      return throwError('CartId is null');
    }
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

    this.loadCartItems();
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

    this.loadCartItems();
  }
}
