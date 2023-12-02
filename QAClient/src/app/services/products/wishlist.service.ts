import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, switchMap, take, tap, throwError } from 'rxjs';
import { ApiService } from '../global/api.service';
import { WishListItem } from 'src/app/models/wishListItem';
import { UserService } from '../user.service';
import { AddToWishListRequest } from 'src/app/models/RequestDTOs/addToWishListRequest';

@Injectable({
  providedIn: 'root',
})
export class WishlistService {
  private endpoint = 'WishListItems'; // Assuming your wishlist endpoint is /api/WishListItems

  private wishListItemsSubject = new BehaviorSubject<WishListItem[]>([]);
  wishListItems$ = this.wishListItemsSubject.asObservable();
  private wishListId: number | null = null;
  private wishListIdLoaded: boolean = false;

  constructor(private apiService: ApiService, private userService: UserService) { }

  initWishlistData(): void {
    console.log('initWishlistData called');

    this.userService.isAuthenticated$
      .pipe(take(1))
      .subscribe((isAuthenticated) => {
        console.log('isAuthenticated in WishlistService:', isAuthenticated);

        if (isAuthenticated && !this.wishListIdLoaded) {
          console.log('User is authenticated, initializing wishlist data.');
          this.loadWishListItems();
        }
      });
  }

  private loadWishListItems(): void {
    const userId = this.userService.getUserId();

    if (userId !== null) {
      this.getWishListId(userId)
        .pipe(
          switchMap((wishListId) => {
            if (wishListId !== null) {
              this.wishListId = wishListId;
              this.wishListIdLoaded = true;
              return this.getWishListItems();
            } else {
              console.error('wishlistId is null');
              return throwError('wishlistId is null');
            }
          })
        )
        .subscribe(
          (wishListItems: WishListItem[]) => {
            console.log('Wishlist items loaded successfully:', wishListItems);
            this.wishListItemsSubject.next(wishListItems);
          },
          (error) => {
            console.error('Error loading wishlist items:', error);
          }
        );
    } else {
      console.error('userId is null');
    }
  }

  getWishListItem(id: number): Observable<WishListItem> {
    return this.apiService.getById<WishListItem>(`${this.endpoint}/GetWishListItem`, id);
  }

  getWishListItems(): Observable<WishListItem[]> {
    if (this.wishListId !== null) {
      return this.apiService.get<WishListItem[]>(`${this.endpoint}/GetWishListItems/${this.wishListId}`).pipe(
        tap((wishListItems) => {
          this.wishListItemsSubject.next(wishListItems);
        }),
        catchError((error) => {
          console.error('Error fetching wishlist items:', error);
          return throwError(error);
        })
      );
    } else {
      console.error('WishListId is null. Cannot fetch wishlist items.');
      return throwError('WishListId is null');
    }
  }

  getWishListId(userId: string): Observable<number | null> {
    return this.apiService.get<number>(`WishLists/${userId}`).pipe(
      tap((wishListId) => {
        if (wishListId !== null) {
          this.wishListId = wishListId;
          this.wishListIdLoaded = true;
        }
      }),
      catchError((error) => {
        console.error('Error getting wishListId:', error);
        return throwError(error);
      })
    );
  }

  addWishListItem(request: AddToWishListRequest): Observable<WishListItem> {
    if (this.wishListId !== null) {
      const newItem: AddToWishListRequest = {
        productId: request.productId,
        wishListId: this.wishListId,
      };

      return this.apiService.post<WishListItem, AddToWishListRequest>(this.endpoint, newItem).pipe(
        tap((addedItem: WishListItem) => {
          const currentWishlistItems = this.wishListItemsSubject.getValue();
          const updatedWishlistItems = [...currentWishlistItems, addedItem];
          this.wishListItemsSubject.next(updatedWishlistItems);
        }),
        catchError((error: any) => {
          console.error('Error adding item to wishlist:', error);
          return throwError(error);
        })
      );
    } else {
      console.error('WishListId is null. Handle this case appropriately.');
      return throwError('WishListId is null');
    }
  }

  updateWishListItem(id: number, wishlistItem: WishListItem): Observable<WishListItem> {
    return this.apiService.put<WishListItem, WishListItem>(`${this.endpoint}/${id}`, wishlistItem);
  }

  removeWishListItem(id: number): Observable<any> {
    return this.apiService.delete(`${this.endpoint}/${id}`).pipe(
      tap(() => {
        const currentWishlistItems = this.wishListItemsSubject.getValue();
        const updatedWishlistItems = currentWishlistItems.filter((item) => item.wishListItemId !== id);
        this.wishListItemsSubject.next(updatedWishlistItems);
      }),
      catchError((error) => {
        console.error('Error removing item from wishlist:', error);
        return throwError(error);
      })
    );
  }

  isInWishlist(productId: number): boolean {
    const wishlistItems = this.wishListItemsSubject.getValue();
    return wishlistItems.some(item => item.productId === productId);
  }

  getWishListItemByProductId(productId: number): WishListItem | undefined {
    return this.wishListItemsSubject.getValue().find(item => item.productId === productId);
  }
}
