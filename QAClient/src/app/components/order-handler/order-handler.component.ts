import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/models/order';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-order-handler',
  templateUrl: './order-handler.component.html',
  styleUrls: ['./order-handler.component.css'],
})
export class OrderHandlerComponent implements OnInit {
  orders: Order[] = [];
  currentPage: number = 1;
  pageSize: number = 10;
  maxPage: number = 1; // Initialize maxPage to 1 initially
  selectedSortOption: 'latest' | 'newest' = 'latest'; // Initialize with 'latest'


  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders() {
    // Assuming you get the orders from the API response
    this.orderService.getOrdersPage(this.currentPage, this.pageSize)
      .subscribe((orders) => {
        this.orders = orders;
        this.maxPage = Math.ceil(orders.length / this.pageSize);
  
        // Sort the orders by latest after loading
        this.sortOrdersByLatest();
      });
  }
  
  loadPreviousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadOrders();
    }
  }

  loadNextPage() {
    this.currentPage++;
    this.loadOrders();
  }
  // button Next Disabled if pagesize  small than 10 or current page is bigger maxpage
  // isNextButtonDisabled(): boolean {
  //   return this.pageSize <= 10 || this.currentPage > this.maxPage;
  // }

  sortOrdersByLatest() {
    this.orders.sort((a, b) => {
      if (this.selectedSortOption === 'latest') {
        return b.date.getTime() - a.date.getTime(); // Sorting in descending order
      }
      return 0; // Default to no sorting
    });
  }
  
  sortOrdersByNewest() {
    this.orders.sort((a, b) => {
      if (this.selectedSortOption === 'newest') {
        return a.date.getTime() - b.date.getTime(); // Sorting in ascending order
      }
      return 0; // Default to no sorting
    });
  }
  
  
  onSortOptionChange() {
    if (this.selectedSortOption === 'latest') {
      this.sortOrdersByLatest();
    } else if (this.selectedSortOption === 'newest') {
      this.sortOrdersByNewest();
    }
  }
}
