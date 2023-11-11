import { Component, Input, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/products/product.service';
import { Product } from 'src/app/models/product';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-promo-product',
  templateUrl: './promo-product.component.html',
  styleUrls: ['./promo-product.component.css']
})
export class PromoProductComponent implements OnInit {
  carouselProducts: Product[] = [
    {
      productId: 1,
      typeId: 1,
      name: 'Product 1',
      description: 'Description for Product 1',
      price: 19.99,
      mainImage: 'https://example.com/product1.jpg',
      mainImageBlob: '',
      background: 'https://mdbcdn.b-cdn.net/img/Photos/Slides/img%20(22).webp',
      bgImageBlob: '',
      stockId: 0,
      quantity: 1,
      varieties: [],
      tags: [],
      galleries: [],
      productReviews: [],
      itemGalleries: []
    },
    {
      productId: 2,
      typeId: 2,
      name: 'Product 2',
      description: 'Description for Product 2',
      price: 24.99,
      mainImage: 'https://example.com/product2.jpg',
      mainImageBlob: '',
      background: 'https://mdbcdn.b-cdn.net/img/Photos/Slides/img%20(22).webp',
      bgImageBlob: '',
      stockId: 0,
      quantity: 1,
      varieties: [],
      tags: [],
      galleries: [],
      productReviews: [],
      itemGalleries: []
    },
    {
      productId: 3,
      typeId: 3,
      name: 'Product 3',
      description: 'Description for Product 3',
      price: 29.99,
      mainImage: 'https://example.com/product3.jpg',
      mainImageBlob: '',
      background: 'https://mdbcdn.b-cdn.net/img/Photos/Slides/img%20(22).webp',
      bgImageBlob: '',
      stockId: 0,
      quantity: 1,
      varieties: [],
      tags: [],
      galleries: [],
      productReviews: [],
      itemGalleries: []
    },
    {
      productId: 4,
      typeId: 4,
      name: 'Product 4',
      description: 'Description for Product 4',
      price: 34.99,
      mainImage: 'https://example.com/product4.jpg',
      mainImageBlob: '',
      background: 'https://mdbcdn.b-cdn.net/img/Photos/Slides/img%20(22).webp',
      bgImageBlob: '',
      stockId: 0,
      quantity: 1,
      varieties: [],
      tags: [],
      galleries: [],
      productReviews: [],
      itemGalleries: []
    },
    {
      productId: 5,
      typeId: 1,
      name: 'Product 5',
      description: 'Description for Product 4',
      price: 34.99,
      mainImage: 'https://example.com/product4.jpg',
      mainImageBlob: '',
      background: 'https://mdbcdn.b-cdn.net/img/Photos/Slides/img%20(22).webp',
      bgImageBlob: '',
      stockId: 0,
      quantity: 1,
      varieties: [],
      tags: [],
      galleries: [],
      productReviews: [],
      itemGalleries: []
    },
    {
      productId: 6,
      typeId: 2,
      name: 'Product 6',
      description: 'Description for Product 4',
      price: 34.99,
      mainImage: 'https://example.com/product4.jpg',
      mainImageBlob: '',
      background: 'https://mdbcdn.b-cdn.net/img/Photos/Slides/img%20(22).webp',
      bgImageBlob: '',
      stockId: 0,
      quantity: 1,
      varieties: [],
      tags: [],
      galleries: [],
      productReviews: [],
      itemGalleries: []
    }
  ];

  currentIndex: number = 0;

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    // this.productService.getCarouselProducts()
    //   .pipe(
    //     catchError((error) => {
    //       console.error('Error fetching carousel products:', error);
    //       return [];
    //     })
    //   )
    //   .subscribe((products) => {
    //     console.log(this.carouselProducts);
    //     this.carouselProducts = products;
    //   });
  }

  // goToSlide(index: number): void {
  //   this.currentIndex = index;
  // }
}
