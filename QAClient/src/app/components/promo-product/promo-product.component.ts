import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/models/product';
import { catchError, throwError } from 'rxjs';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-promo-product',
  templateUrl: './promo-product.component.html',
  styleUrls: ['./promo-product.component.css']
})
export class PromoProductComponent {
  carouselProducts: Product[] = [];

  carouselOptions: OwlOptions = {
    items: 4, // Number of items to display at a time
    loop: true, // Enable loop for continuous rotation
    nav: true, // Enable navigation arrows
    autoplay: true, // Enable auto rotation
    autoplayTimeout: 3000, // Time in milliseconds between rotations (adjust as needed)
  };

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.productService.getCarouselProducts()
      .pipe(
        catchError((error) => {
          console.error('Error fetching carousel products:', error);
          // You can return an empty array or handle the error in a different way
          return throwError('Failed to fetch carousel products');
        })
      )
      .subscribe((products) => {
        this.carouselProducts = products;
      });
  }
}
