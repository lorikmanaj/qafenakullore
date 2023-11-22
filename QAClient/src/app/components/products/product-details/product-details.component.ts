import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/app/environments/environment';
import { Product } from 'src/app/models/product';
import { Variety } from 'src/app/models/variety';
import { ProductService } from 'src/app/services/products/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  product: Product | undefined;

  detailsGallery: string[] = [];

  /* Slider Images  */
  imgId = 1;

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
            console.log(this.product);
            // Optionally, you can do additional things with the loaded product data here
          },
          error => {
            console.error('Error fetching product details:', error);
          }
        );
      }
    });

    this.initializeImageSlider();
    this.detailsGallery = this.product.itemGalleries.map(gallery => gallery.imageUrl);
  }

  constructImageUrl(imagePath: string): string {
    return `${environment.serverBaseUrl}${imagePath}`;
  }

  initializeImageSlider() {
    const imgs = document.querySelectorAll('.img-select a');
    const imgBtns = Array.from(imgs);

    imgBtns.forEach((imgItem) => {
      imgItem.addEventListener('click', (event: Event) => {
        event.preventDefault();
        this.imgId = parseInt(imgItem.getAttribute('data-id') || '1', 10);
        this.slideImage();
      });

    });

    window.addEventListener('resize', () => this.slideImage());
  }

  slideImage() {
    const displayWidth = (document.querySelector('.img-showcase img:first-child') as HTMLElement)?.clientWidth || 0;
    const imgShowcase = document.querySelector('.img-showcase') as HTMLElement;
    if (imgShowcase) {
      imgShowcase.style.transform = `translateX(${- (this.imgId - 1) * displayWidth}px)`;
    }
  }

  selectVariety(variety: Variety) {
    // Update detailsGallery with variety images
    this.detailsGallery = variety.images.map(image => image.imageUrl);
  }
}
