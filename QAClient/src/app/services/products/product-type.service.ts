import { Injectable } from '@angular/core';
import { ProductType } from '../../models/productType';
import { Observable } from 'rxjs';
import { ApiService } from '../global/api.service';

@Injectable({
  providedIn: 'root'
})
export class ProductTypeService {
  private productTypes: ProductType[] = [];

  constructor(private apiService: ApiService) { }

  getProductTypes(): Observable<ProductType[]> {
    return this.apiService.get<ProductType[]>('ProductTypes');
  }


}
