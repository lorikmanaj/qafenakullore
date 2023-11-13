import { Injectable } from '@angular/core';
import { Product } from 'src/app/models/product';
import { Observable, map, of, throwError } from 'rxjs';
import { ApiService } from '../global/api.service';
import { environment } from 'src/app/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private products: Product[] = [];

  constructor(private apiService: ApiService) { }

  getProductById(productId: number): Observable<Product> {
    const product = this.products.find((p) => p.productId === productId);
    if (!product) {
      return throwError(new Error('Product not found'));
    }
    return of(product);
  }

  getProductsByType(typeId: number): Observable<Product[]> {
    return this.apiService.get<Product[]>(`Products/ProductsType/${typeId}`);
  }

  getProducts(): Observable<Product[]> {
    return this.apiService.get<Product[]>('Products');
  }
  // getProducts(): Observable<Product[]> {
  //   return this.apiService.get<Product[]>(`products`)
  //     .pipe(
  //       map(products => {
  //         // Modify image URLs for each product
  //         return products.map(product => {
  //           product.mainImage = `${environment.apiUrl}/${product.mainImage}`;
  //           // You can do this for other image properties as well
  //           return product;
  //         });
  //       })
  //     );
  // }

  // getProducts(): Observable<Product[]> {
  //   return of(this.products);
  // }
  updateProduct(product: Product): Observable<Product> {
    return this.apiService.put<Product, Product>('Products', product);
  }

  getHeadlineProduct(): Observable<Product> {
    const headlineProduct = this.products[0];
    return of(headlineProduct);
  }

  getCarouselProducts(): Observable<Product[]> {
    return of(this.products);
  }

  createProduct(productData: any): Observable<Product> {
    return this.apiService.post<Product>('products', productData);
  }
}
