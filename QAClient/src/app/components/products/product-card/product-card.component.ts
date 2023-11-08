import { Component, Input, OnInit } from '@angular/core';
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

  currentImageIndex: number = 0;
  currentImage: string | undefined; // Initialize currentImage as undefined

  constructor(private productService: ProductService) { }

  ngOnInit() {
    // Fetch the product using the product ID
    this.productService.getProductById(this.productId).subscribe((product) => {
      this.product = product;
      // Initialize currentImage with the first image if product is defined
      if (this.product && this.product.varieties[0].imageUrl) {
        this.currentImage = this.product.varieties[0].imageUrl;
      }
    });
  }

  handleMouseEnter() {
    // Change the image to the second one on hover if product and varieties are defined
    if (this.product && this.product.varieties.length > 1) {
      this.currentImageIndex = 1;
      // Set a default image URL if imageUrl is null (replace 'defaultImageUrl' with your desired URL)
      this.currentImage = this.product.varieties[1].imageUrl || 'assets/red.png';
    }
  }

  handleMouseLeave() {
    // Reset to the first image on mouse leave if product is defined
    if (this.product) {
      this.currentImageIndex = 0;
      this.currentImage = this.product.varieties[0].imageUrl || 'assets/red.png';
    }
  }

  changeImage(index: number) {
    // Change the image to the selected variety's image if product is defined
    if (this.product) {
      this.currentImageIndex = index;
      this.currentImage = this.product.varieties[index].imageUrl || 'assets/red.png';
    }
  }

  resetImage() {
    // Reset to the current image on mouse leave from varieties if product is defined
    if (this.product) {
      this.currentImage = this.product.varieties[this.currentImageIndex].imageUrl || 'assets/red.png';
    }
  }
}
