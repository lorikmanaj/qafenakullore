import { Injectable } from '@angular/core';
import { ApiService } from '../global/api.service';
import { ProductReview } from 'src/app/models/productReview';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductReviewService {
  private reviews: ProductReview[] = [];

  constructor(private apiService: ApiService) { }

  getReviews(): Observable<ProductReview[]> {
    return this.apiService.get<ProductReview[]>('ProductReviews');
  }

  getReviewsForProduct(productId: number): Observable<ProductReview[]> {
    return this.apiService.getProductReview
  }
}
