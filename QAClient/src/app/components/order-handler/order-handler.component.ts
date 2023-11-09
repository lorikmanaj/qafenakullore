import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { Order } from 'src/app/models/order';
import { OrderService } from 'src/app/services/order.service';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { LiveAnnouncer } from '@angular/cdk/a11y';

@Component({
  selector: 'app-order-handler',
  templateUrl: './order-handler.component.html',
  styleUrls: ['./order-handler.component.css'],
})
export class OrderHandlerComponent implements AfterViewInit {
  orders: MatTableDataSource<Order> = new MatTableDataSource<Order>();
  displayedColumns: string[] = ['orderId', 'client', 'date', 'status', 'shippingAddress', 'payment', 'notes', 'total', 'discounts'];


  pageSize = 5; // Initial page size
  pageSizeOptions: number[] = [5, 10, 25]; // Options for page size selection


  @ViewChild(MatSort) sort!: MatSort;

  constructor(private orderService: OrderService,
    private _liveAnnouncer: LiveAnnouncer) { }

  ngAfterViewInit() {
    this.orders.sort = this.sort;
  }

  announceSortChange(sortState: Sort) {
    // This example uses English messages. If your application supports
    // multiple language, you would internationalize these strings.
    // Furthermore, you can customize the message to add additional
    // details about the values being sorted.
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  ngOnInit() {
    this.orderService.getOrders().subscribe(
      (orders: Order[]) => {
        this.orders.data = orders;
        console.log('Orders:', this.orders.data);
      },
      (error) => {
        console.error('Error fetching orders:', error);
      }
    );
  }
}
