import { Component, Input, OnInit } from '@angular/core';
import { environment } from 'src/app/environments/environment';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/products/product.service';
import { ProductReviewService } from './../../../services/products/product-review.service';
import { ReviewDetails } from 'src/app/models/reviewDetails';
import {
  faCartShopping,
  faHeart,
} from '@fortawesome/free-solid-svg-icons';
import { WishlistService } from 'src/app/services/products/wishlist.service';
import { CartService } from './../../../services/products/cart.service';
import { catchError, tap } from 'rxjs/operators';
import { WishListItem } from 'src/app/models/wishListItem';
import { CartItem } from 'src/app/models/cartItem';
import { Observable, of, throwError } from 'rxjs';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css'],
})
export class ProductCardComponent implements OnInit {
  @Input() productId!: number;
  product: Product | undefined;
  reviewDetails: ReviewDetails | undefined;

  faCart = faCartShopping;
  faHeart = faHeart;

  private readonly defaultImageUrl = 'assets/red.png';

  currentImageIndex: number = 0;
  currentImage: string | undefined;

  constructor(private productService: ProductService,
    private wishListService: WishlistService,
    private cartService: CartService,
    private productReviewService: ProductReviewService) { }

  ngOnInit() {
    this.productService.getProductById(this.productId).subscribe((product) => {
      this.product = product;

      // Check if product and varieties are defined and not empty
      if (this.product && this.product.varieties && this.product.varieties.length > 0) {
        // Initialize currentImage with the first image if product is defined
        if (this.product.varieties[0].imageUrl) {
          this.currentImage = this.product.varieties[0].imageUrl;
        }
      }
    });

    this.productReviewService.getProdReviewsDetails(this.productId).subscribe(
      (reviewDetails) => {
        this.reviewDetails = reviewDetails;
      },
      (error) => {
        console.error('Error fetching review details:', error);
      }
    );
  }

  constructImageUrl(imagePath: string): string {
    return `${environment.serverBaseUrl}${imagePath}`;
  }

  handleMouseEnter() {
    if (this.product && this.product.varieties && this.product.varieties.length > 1) {
      this.setCurrentImage(1);
    }
  }

  handleMouseLeave() {
    if (this.product) {
      this.setCurrentImage(0);
    }
  }

  changeImage(index: number) {
    if (this.product) {
      this.setCurrentImage(index);
    }
  }

  resetImage() {
    if (this.product) {
      this.setCurrentImage(this.currentImageIndex);
    }
  }

  private setCurrentImage(index: number): void {
    if (this.product && this.product.varieties && this.product.varieties.length > index) {
      this.currentImageIndex = index;
      this.currentImage = this.product.varieties[index].imageUrl || this.defaultImageUrl;
    }
  }

  addToCart(): Observable<CartItem> {
    if (this.product) {
      // Call addToCart without subscribing here
      return this.cartService.addToCart(this.product.productId).pipe(
        tap((addedItem: CartItem) => {
          console.log('Item added to cart:', addedItem);
        }),
        catchError((error: any) => {
          console.error('Error adding item to cart:', error);
          // Handle error, e.g., show an error message
          return throwError(error);
        })
      );
    } else {
      // If there's no product, return an observable with an error
      return throwError('Product is not defined');
    }
  }


  addToWishlist() {
    if (this.product) {
      this.wishListService.addWishListItem({
        productId: this.product.productId,
        wishListId: 0,
      }).subscribe(
        (addedItem: WishListItem) => {
          // Handle success, e.g., show a success message
          console.log('Item added to wishlist:', addedItem);
        },
        (error: any) => {
          console.error('Error adding item to wishlist:', error);
          // Handle error, e.g., show an error message
        }
      );
    }
  }
}
