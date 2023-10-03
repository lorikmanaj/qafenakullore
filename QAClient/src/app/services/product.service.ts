import { Injectable } from '@angular/core';
import { Product } from 'src/app/models/product';
import { Observable, of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private products: Product[] = [
    {
      id: 1,
      name: 'Product 1',
      description: 'Description for Product 1',
      price: 19.99,
      image: 'https://example.com/product1.jpg',
      bg: 'https://mdbcdn.b-cdn.net/img/Photos/Slides/img%20(22).webp',
      quantity: 1,
      varieties: [
        { varietyId: 1, description: 'Red', imageUrl: 'assets/red.png' },
        { varietyId: 2, description: 'Green', imageUrl: 'assets/green.png' }
      ]
    },
    {
      id: 2,
      name: 'Product 2',
      description: 'Description for Product 2',
      price: 24.99,
      image: 'https://example.com/product2.jpg',
      bg: 'https://mdbcdn.b-cdn.net/img/Photos/Slides/img%20(22).webp',
      quantity: 2,
      varieties: [
        { varietyId: 1, description: 'Red', imageUrl: 'assets/red.png' },
        { varietyId: 2, description: 'Green', imageUrl: 'assets/green.png' }
      ]
    },
    {
      id: 3,
      name: 'Product 3',
      description: 'Description for Product 3',
      price: 29.99,
      image: 'https://example.com/product3.jpg',
      bg: 'https://mdbcdn.b-cdn.net/img/Photos/Slides/img%20(22).webp',
      quantity: 3,
      varieties: [
        { varietyId: 1, description: 'Red', imageUrl: 'assets/red.png' },
        { varietyId: 2, description: 'Green', imageUrl: 'assets/green.png' }
      ]
    },
    {
      id: 4,
      name: 'Product 4',
      description: 'Description for Product 4',
      price: 34.99,
      image: 'https://example.com/product4.jpg',
      bg: 'https://mdbcdn.b-cdn.net/img/Photos/Slides/img%20(22).webp',
      quantity: 1,
      varieties: [
        { varietyId: 1, description: 'Red', imageUrl: 'assets/red.png' },
        { varietyId: 2, description: 'Green', imageUrl: 'assets/green.png' }
      ]
    },
    {
      id: 5,
      name: 'Product 5',
      description: 'Description for Product 4',
      price: 34.99,
      image: 'https://example.com/product4.jpg',
      bg: 'https://mdbcdn.b-cdn.net/img/Photos/Slides/img%20(22).webp',
      quantity: 8,
      varieties: [
        { varietyId: 1, description: 'Red', imageUrl: 'assets/red.png' },
        { varietyId: 2, description: 'Green', imageUrl: 'assets/green.png' }
      ]
    },
    {
      id: 6,
      name: 'Product 6',
      description: 'Description for Product 4',
      price: 34.99,
      image: 'https://example.com/product4.jpg',
      bg: 'https://mdbcdn.b-cdn.net/img/Photos/Slides/img%20(22).webp',
      quantity: 1,
      varieties: [
        { varietyId: 1, description: 'Red', imageUrl: 'assets/red.png' },
        { varietyId: 2, description: 'Green', imageUrl: 'assets/green.png' }
      ]
    },
    {
      id: 6,
      name: 'Product 6',
      description: 'Description for Product 4',
      price: 34.99,
      image: 'https://example.com/product4.jpg',
      bg: 'https://mdbcdn.b-cdn.net/img/Photos/Slides/img%20(22).webp',
      quantity: 1,
      varieties: [
        { varietyId: 1, description: 'Red', imageUrl: 'assets/red.png' },
        { varietyId: 2, description: 'Green', imageUrl: 'assets/green.png' }
      ]
    },
    {
      id: 6,
      name: 'Product 6',
      description: 'Description for Product 4',
      price: 34.99,
      image: 'https://example.com/product4.jpg',
      bg: 'https://mdbcdn.b-cdn.net/img/Photos/Slides/img%20(22).webp',
      quantity: 1,
      varieties: [
        { varietyId: 1, description: 'Red', imageUrl: 'assets/red.png' },
        { varietyId: 2, description: 'Green', imageUrl: 'assets/green.png' }
      ]
    }
  ];

  constructor() { }

  getProductById(productId: number): Observable<Product> {
    const product = this.products.find((p) => p.id === productId);
    if (!product) {
      return throwError(new Error('Product not found'));
    }
    return of(product);
  }

  getProducts(): Observable<Product[]> {
    return of(this.products);
  }

  getHeadlineProduct(): Observable<Product> {
    const headlineProduct = this.products[0];
    return of(headlineProduct);
  }

  getCarouselProducts(): Observable<Product[]> {
    return of(this.products);
  }

  //NDREQE
  getProductsByType(typeId: number): Observable<Product[]> {
    return of(this.products);
  }
}
