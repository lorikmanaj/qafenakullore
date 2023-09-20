import { Component, OnInit } from '@angular/core';
import { SidebarService } from './services/sidebar.service';
import { animate, style, transition, trigger } from '@angular/animations';
import { ProductService } from './services/product.service';
import { Product } from './models/product';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('slidein', [
      transition(':enter', [
        // when ngif has true
        style({ transform: 'translateX(-100%)' }),
        animate(250, style({ transform: 'translateX(0)' }))
      ]),
      transition(':leave', [
        // when ngIf has false
        animate(250, style({ transform: 'translateX(-100%)' }))
      ])
    ])
  ]
})
export class AppComponent {
  isCollapsed = false;
  title = 'QAClient';
  // sidebarVisible: boolean = false;
  expanded: boolean = false;

  products: Product[] = [];

  constructor(private sidebarService: SidebarService,
    private productService: ProductService) { }

  ngOnInit() {
    // Initialize sidebar visibility based on the service
    // this.sidebarService.getSidebarVisibility().subscribe((isVisible) => {
    //   this.sidebarVisible = isVisible;
    // });
    this.productService.getProducts().subscribe((products) => {
      this.products = products;
    });
  }

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
  }
  // Method to toggle sidebar visibility
  // toggleSidebar() {
  //   this.sidebarService.toggleSidebar(!this.sidebarVisible);
  // }
}
