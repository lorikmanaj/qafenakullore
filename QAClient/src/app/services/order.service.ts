import { Injectable } from '@angular/core';
import { Order } from '../models/order';
import { Observable, of, throwError } from 'rxjs';
import { ApiService } from './global/api.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private products: Order[] = [];

  constructor(private apiService: ApiService) { }

  getOrderById(orderId: number): Observable<Order> {
    const order = this.products.find((o) => o.orderId === orderId);
    if (!order) {
      return throwError(new Error('Order not found'));
    }
    return of(order);
  }

  getOrders(): Observable<Order[]> {
    return this.apiService.get<Order[]>('Orders');
  }

  //NDREQE
  getProductsByType(typeId: number): Observable<Order[]> {
    return of(this.products);
  }

  createOrder(orderData: any): Observable<Order> {
    return this.apiService.post<Order>('orders', orderData);
  }
  
  getOrdersPage(page: number, pageSize: number): Observable<Order[]> {
    // Implement pagination logic on the server-side and pass page and pageSize to the API request.
    return this.apiService.get<Order[]>(`Orders?page=${page}&pageSize=${pageSize}`);
  }

}
