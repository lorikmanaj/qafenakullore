import { Injectable } from '@angular/core';
import { ApiService } from '../global/api.service';
import { Observable } from 'rxjs';
import { ItemGallery } from 'src/app/models/itemGallery';
import { environment } from 'src/app/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ItemGalleryService {

  constructor(private apiService: ApiService) { }

  getProductGallery(productId: number): Observable<ItemGallery[]> {
    return this.apiService.get<ItemGallery[]>
      (`ItemGalleries/${productId}`);
  }

  // updateProductGallery(productId: number, galleryImages: string[]): Observable<void> {
  //   const url = `${this.apiUrl}/api/products/${productId}/gallery`;
  //   return this.http.put<void>(url, galleryImages);
  // }
}
