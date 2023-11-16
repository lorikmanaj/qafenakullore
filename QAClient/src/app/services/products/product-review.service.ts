import { Injectable } from '@angular/core';
import { ApiService } from '../global/api.service';
import { ProductReview } from 'src/app/models/productReview';
import { Observable } from 'rxjs';
import { ReviewDetails } from 'src/app/models/reviewDetails';

@Injectable({
  providedIn: 'root'
})
export class ProductReviewService {
  private reviews: ProductReview[] = [];

  constructor(private apiService: ApiService) { }

  getReviews(): Observable<ProductReview[]> {
    return this.apiService.get<ProductReview[]>('ProductReviews');
  }

  getProdReviewsDetails(productId: number): Observable<ReviewDetails> {
    return this.apiService.get<ReviewDetails>(`ProductReviews/${productId}/Details`);
  }
}
