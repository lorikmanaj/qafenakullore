import { Injectable } from '@angular/core';
import { Product } from 'src/app/models/product';
import { Observable, of, throwError } from 'rxjs';
import { ApiService } from '../global/api.service';

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
      mainImage: 'https://example.com/product1.jpg',
      mainImageBlob: '',
      bg: 'https://mdbcdn.b-cdn.net/img/Photos/Slides/img%20(22).webp',
      bgImageBlob: '',
      quantity: 1,
      varieties: [
        { varietyId: 1, productId: 1, description: 'Red', imageUrl: 'assets/red.png', imageBlob: '' },
        { varietyId: 2, productId: 1, description: 'Green', imageUrl: 'assets/green.png', imageBlob: '' }
      ],
      tags: []
    },
    {
      id: 2,
      name: 'Product 2',
      description: 'Description for Product 2',
      price: 24.99,
      mainImage: 'https://example.com/product2.jpg',
      mainImageBlob: '',
      bg: 'https://mdbcdn.b-cdn.net/img/Photos/Slides/img%20(22).webp',
      bgImageBlob: '',
      quantity: 2,
      varieties: [
        { varietyId: 1, productId: 2, description: 'Red', imageUrl: 'assets/red.png', imageBlob: '' },
        { varietyId: 2, productId: 2, description: 'Green', imageUrl: 'assets/green.png', imageBlob: '' }
      ],
      tags: []
    },
    {
      id: 3,
      name: 'Product 3',
      description: 'Description for Product 3',
      price: 29.99,
      mainImage: 'https://example.com/product3.jpg',
      mainImageBlob: '',
      bg: 'https://mdbcdn.b-cdn.net/img/Photos/Slides/img%20(22).webp',
      bgImageBlob: '',
      quantity: 3,
      varieties: [
        { varietyId: 1, productId: 3, description: 'Red', imageUrl: 'assets/red.png', imageBlob: '' },
        { varietyId: 2, productId: 3, description: 'Green', imageUrl: 'assets/green.png', imageBlob: '' }
      ],
      tags: []
    },
    {
      id: 4,
      name: 'Product 4',
      description: 'Description for Product 4',
      price: 34.99,
      mainImage: 'https://example.com/product4.jpg',
      mainImageBlob: '',
      bg: 'https://mdbcdn.b-cdn.net/img/Photos/Slides/img%20(22).webp',
      bgImageBlob: '',
      quantity: 1,
      varieties: [
        { varietyId: 1, productId: 4, description: 'Red', imageUrl: 'assets/red.png', imageBlob: '' },
        { varietyId: 2, productId: 4, description: 'Green', imageUrl: 'assets/green.png', imageBlob: '' }
      ],
      tags: []
    },
    {
      id: 5,
      name: 'Product 5',
      description: 'Description for Product 4',
      price: 34.99,
      mainImage: 'https://example.com/product4.jpg',
      mainImageBlob: '',
      bg: 'https://mdbcdn.b-cdn.net/img/Photos/Slides/img%20(22).webp',
      bgImageBlob: '',
      quantity: 8,
      varieties: [
        { varietyId: 1, productId: 5, description: 'Red', imageUrl: 'assets/red.png', imageBlob: '' },
        { varietyId: 2, productId: 5, description: 'Green', imageUrl: 'assets/green.png', imageBlob: '' }
      ],
      tags: []
    },
    {
      id: 6,
      name: 'Product 6',
      description: 'Description for Product 4',
      price: 34.99,
      mainImage: 'https://example.com/product4.jpg',
      mainImageBlob: '',
      bg: 'https://mdbcdn.b-cdn.net/img/Photos/Slides/img%20(22).webp',
      bgImageBlob: '',
      quantity: 1,
      varieties: [
        { varietyId: 1, productId: 6, description: 'Red', imageUrl: 'assets/red.png', imageBlob: '' },
        { varietyId: 2, productId: 6, description: 'Green', imageUrl: 'assets/green.png', imageBlob: '' }
      ],
      tags: []
    },
    {
      id: 7,
      name: 'Product 7',
      description: 'Description for Product 4',
      price: 34.99,
      mainImage: 'https://example.com/product4.jpg',
      mainImageBlob: '',
      bg: 'https://mdbcdn.b-cdn.net/img/Photos/Slides/img%20(22).webp',
      bgImageBlob: '',
      quantity: 1,
      varieties: [
        { varietyId: 1, productId: 7, description: 'Red', imageUrl: 'assets/red.png', imageBlob: '' },
        { varietyId: 2, productId: 7, description: 'Green', imageUrl: 'assets/green.png', imageBlob: '' }
      ],
      tags: []
    },
    {
      id: 8,
      name: 'Product 8',
      description: 'Description for Product 4',
      price: 34.99,
      mainImage: 'https://example.com/product4.jpg',
      mainImageBlob: '',
      bg: 'https://mdbcdn.b-cdn.net/img/Photos/Slides/img%20(22).webp',
      bgImageBlob: '',
      quantity: 1,
      varieties: [
        { varietyId: 1, productId: 8, description: 'Red', imageUrl: 'assets/red.png', imageBlob: '' },
        { varietyId: 2, productId: 8, description: 'Green', imageUrl: 'assets/green.png', imageBlob: '' }
      ],
      tags: []
    }
  ];

  constructor(private apiService: ApiService) { }

  getProductById(productId: number): Observable<Product> {
    const product = this.products.find((p) => p.id === productId);
    if (!product) {
      return throwError(new Error('Product not found'));
    }
    return of(product);
  }

  getProducts(): Observable<Product[]> {
    const path = 'Products';
    return this.apiService.get<Product[]>(path);
  }

  // getProducts(): Observable<Product[]> {
  //   return of(this.products);
  // }

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

  createProduct(productData: any): Observable<Product> {
    const path = 'products';
    return this.apiService.post<Product>(path, productData);
  }
}
