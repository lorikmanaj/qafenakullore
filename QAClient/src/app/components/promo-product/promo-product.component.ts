import { Component, Input, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
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
      id: 1,
      name: 'Product 1',
      description: 'Description for Product 1',
      price: 19.99,
      mainImage: 'https://example.com/product1.jpg',
      bg: 'https://mdbcdn.b-cdn.net/img/Photos/Slides/img%20(22).webp',
      quantity: 1,
      varieties: [],
      tags: []
    },
    {
      id: 2,
      name: 'Product 2',
      description: 'Description for Product 2',
      price: 24.99,
      mainImage: 'https://example.com/product2.jpg',
      bg: 'https://mdbcdn.b-cdn.net/img/Photos/Slides/img%20(22).webp',
      quantity: 1,
      varieties: [],
      tags: []
    },
    {
      id: 3,
      name: 'Product 3',
      description: 'Description for Product 3',
      price: 29.99,
      mainImage: 'https://example.com/product3.jpg',
      bg: 'https://mdbcdn.b-cdn.net/img/Photos/Slides/img%20(22).webp',
      quantity: 1,
      varieties: [],
      tags: []
    },
    {
      id: 4,
      name: 'Product 4',
      description: 'Description for Product 4',
      price: 34.99,
      mainImage: 'https://example.com/product4.jpg',
      bg: 'https://mdbcdn.b-cdn.net/img/Photos/Slides/img%20(22).webp',
      quantity: 1,
      varieties: [],
      tags: []
    },
    {
      id: 5,
      name: 'Product 5',
      description: 'Description for Product 4',
      price: 34.99,
      mainImage: 'https://example.com/product4.jpg',
      bg: 'https://mdbcdn.b-cdn.net/img/Photos/Slides/img%20(22).webp',
      quantity: 1,
      varieties: [],
      tags: []
    },
    {
      id: 6,
      name: 'Product 6',
      description: 'Description for Product 4',
      price: 34.99,
      mainImage: 'https://example.com/product4.jpg',
      bg: 'https://mdbcdn.b-cdn.net/img/Photos/Slides/img%20(22).webp',
      quantity: 1,
      varieties: [],
      tags: []
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
