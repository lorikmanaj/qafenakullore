import { Component, Type } from '@angular/core';
import { ProductHandlerComponent } from './../product-handler/product-handler.component';
import { OrderHandlerComponent } from '../order-handler/order-handler.component';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css'],
})
export class AdminPanelComponent {
  currentModule: Type<any> | null = null; // Holds the currently selected module

  openModule(module: string) {
    // Set the current module based on the selected option
    switch (module) {
      case 'products':
        this.currentModule = ProductHandlerComponent;
        break;
      case 'orders':
        this.currentModule = OrderHandlerComponent;
        break;
      // Define cases for other modules
      default:
        this.currentModule = null;
        break;
    }
  }
}
