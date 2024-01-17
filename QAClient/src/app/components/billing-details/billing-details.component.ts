import { Component } from '@angular/core';
import { CheckoutService } from './../../services/shared/checkout.service';
import { CartItem } from 'src/app/models/cartItem';

@Component({
  selector: 'app-billing-details',
  templateUrl: './billing-details.component.html',
  styleUrls: ['./billing-details.component.css']
})
export class BillingDetailsComponent {

  private finalItems: CartItem[] = [];

  constructor(private checkoutService: CheckoutService) {

  }

  ngOnInit() {
    this.finalItems = this.checkoutService.getFinalizedItems();
  }

}
