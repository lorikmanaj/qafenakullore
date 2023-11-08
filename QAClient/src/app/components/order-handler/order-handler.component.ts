import { Component } from '@angular/core';
import { Order } from 'src/app/models/order';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-order-handler',
  templateUrl: './order-handler.component.html',
  styleUrls: ['./order-handler.component.css']
})
export class OrderHandlerComponent {
  orders: Order[] = [];

  constructor(private orderService: OrderService) {

  }

  ngOnInit() {
    this.orderService.getOrders().subscribe(
      (orders: Order[]) => {
        this.orders = orders;
        console.log('Orders:', this.orders);
      },
      (error) => {
        console.error('Error fetching orders:', error);
      }
    );
  }
}
