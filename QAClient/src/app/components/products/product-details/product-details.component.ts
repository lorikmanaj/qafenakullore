import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/app/environments/environment';
import { Product } from 'src/app/models/product';
import { ReviewDetails } from 'src/app/models/reviewDetails';
import { Variety } from 'src/app/models/variety';
import { ProductService } from 'src/app/services/products/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  product: Product | undefined;
  reviewDetails: ReviewDetails | undefined;

  detailsGallery: string[] = [];

  /* Slider Images  */
  currentImage: string | undefined;
  defaultImageUrl: string = ''; // Set a default image URL

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) { }

  ngOnInit() {
    // Get the product ID from the route parameters
    this.route.paramMap.subscribe(params => {
      const productId = params.get('id');

      if (productId) {
        this.productService.getProductById(+productId).subscribe(
          product => {
            this.product = product;
            // Set the initial image
            this.currentImage = product.mainImage;
            // Optionally, you can do additional things with the loaded product data here
          },
          error => {
            console.error('Error fetching product details:', error);
          }
        );
      }
    });

    this.currentImage = this.product?.mainImage;
  }

  changeImage(imageUrl: string) {
    this.currentImage = imageUrl;
  }

  constructImageUrl(imagePath: string | undefined): string {
    return `${environment.serverBaseUrl}${imagePath}`;
  }
  // addToCart(product: Product) {

  // }
}
