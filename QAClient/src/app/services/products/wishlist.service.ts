import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, switchMap, take, tap, throwError } from 'rxjs';
import { ApiService } from '../global/api.service';
import { WishListItem } from 'src/app/models/wishListItem';
import { UserService } from '../user.service';

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
          this.loadWishlistItems();
        }
      });
  }

  private loadWishlistItems(): void {
    const userId = this.userService.getUserId();

    if (userId !== null) {
      this.getWishlistId(userId)
        .pipe(
          switchMap((wishListId) => {
            if (wishListId !== null) {
              this.wishListId = wishListId;
              this.wishListIdLoaded = true;
              return this.getWishlistItems();
            } else {
              console.error('wishlistId is null');
              return throwError('wishlistId is null');
            }
          })
        )
        .subscribe(
          (wishlistItems: WishListItem[]) => {
            console.log('Wishlist items loaded successfully:', wishlistItems);
            this.wishListItemsSubject.next(wishlistItems);
          },
          (error) => {
            console.error('Error loading wishlist items:', error);
          }
        );
    } else {
      console.error('userId is null');
    }
  }

  getWishlistItems(): Observable<WishListItem[]> {
    if (this.wishListId !== null) {
      return this.apiService.get<WishListItem[]>(`${this.endpoint}/${this.wishListId}`).pipe(
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

  getWishlistId(userId: string): Observable<number | null> {
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

  getWishlistItem(id: number): Observable<WishListItem> {
    return this.apiService.getById<WishListItem>(this.endpoint, id);
  }

  addWishlistItem(wishlistItem: WishListItem): Observable<WishListItem> {
    return this.apiService.post<WishListItem, WishListItem>(this.endpoint, wishlistItem);
  }

  updateWishlistItem(id: number, wishlistItem: WishListItem): Observable<WishListItem> {
    return this.apiService.put<WishListItem, WishListItem>(`${this.endpoint}/${id}`, wishlistItem);
  }

  removeWishlistItem(id: number): Observable<any> {
    return this.apiService.delete(`${this.endpoint}/${id}`);
  }
}
