import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../global/api.service';  // Adjust the path accordingly
import { WishListItem } from 'src/app/models/wishListItem';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  private endpoint = 'WishListItems'; // Assuming your wishlist endpoint is /api/WishListItems

  constructor(private apiService: ApiService) { }

  getWishlistItems(): Observable<WishListItem[]> {
    return this.apiService.get<WishListItem[]>(this.endpoint);
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
