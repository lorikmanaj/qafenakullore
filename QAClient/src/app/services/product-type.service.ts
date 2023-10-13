import { Injectable } from '@angular/core';
import { ProductType } from '../models/productType';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductTypeService {
  private productTypes: ProductType[] = [];

  constructor(private http: HttpClient) { }

  getProductTypes(): Observable<ProductType[]> {
    const url = `${environment.apiUrl}/ProductTypes`;
    return this.http.get<ProductType[]>(url);
  }

}
