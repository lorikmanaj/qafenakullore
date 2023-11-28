import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, tap, throwError } from 'rxjs';
import { ApiService } from '../global/api.service';  // Adjust the path accordingly
import { WishListItem } from 'src/app/models/wishListItem';
import { UserService } from '../user.service';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  private endpoint = 'WishListItems'; // Assuming your wishlist endpoint is /api/WishListItems

  private wishListItemsSubject = new BehaviorSubject<WishListItem[]>([]);
  wishListItems$ = this.wishListItemsSubject.asObservable();
  private wishListId: number | null = null;

  constructor(private apiService: ApiService,
    private userService: UserService) { }

  initWishlistData(): void {
    this.userService.isAuthenticated$.subscribe((isAuthenticated) => {
      if (isAuthenticated) {
        this.loadWishlistItems();
      }
    });
  }

  private loadWishlistItems(): void {
    const userId = this.userService.getUserId();

    if (userId !== null) {
      this.getWishlistId(userId).subscribe((wishlistId) => {
        if (wishlistId !== null) {
          this.getWishlistItems(wishlistId).subscribe(
            (wishlistItems: WishListItem[]) => {
              this.wishListItemsSubject.next(wishlistItems);
            },
            (error) => {
              console.error('Error loading wishlist items:', error);
            }
          );
        } else {
          console.error('wishlistId is null');
        }
      });
    } else {
      console.error('userId is null');
    }
  }

  getWishlistItems(wishlistId: number): Observable<WishListItem[]> {
    return this.apiService.get<WishListItem[]>(`${this.endpoint}/${wishlistId}`).pipe(
      catchError((error) => {
        console.error('Error fetching wishlist items:', error);
        return throwError(error);
      })
    );
  }

  getWishlistId(userId: string): Observable<number | null> {
    return this.apiService.get<number>(`WishLists/${userId}`).pipe(
      tap((wishListId) => {
        this.wishListId = wishListId;
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
