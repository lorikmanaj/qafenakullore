import { Component, Input, OnInit } from '@angular/core';
import { environment } from 'src/app/environments/environment';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/products/product.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css'],
})
export class ProductCardComponent implements OnInit {
  @Input() productId!: number;
  product: Product | undefined; // Initialize product as undefined

  private readonly defaultImageUrl = 'assets/red.png';

  currentImageIndex: number = 0;
  currentImage: string | undefined; // Initialize currentImage as undefined

  constructor(private productService: ProductService) { }

  ngOnInit() {
    // Fetch the product using the product ID
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

}
