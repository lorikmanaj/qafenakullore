import { Component, OnInit } from '@angular/core';
import { environment } from 'src/app/environments/environment';
import { CartService } from 'src/app/services/products/cart.service';
import { CartItem } from 'src/app/models/cartItem';
import { ProductService } from 'src/app/services/products/product.service';
import { DisplayedCartItem } from './../../models/displayedCartItem';
import { Product } from 'src/app/models/product';
import { ToastrService } from 'ngx-toastr';
import { CartCheckoutSyncService } from 'src/app/services/shared/cart-checkout-sync.service';
import { CheckoutService } from 'src/app/services/shared/checkout.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  cartItems: CartItem[] = [];
  displayedCartItems: DisplayedCartItem[] = [];
  //Change
  transportFee: number = 5;
  //Change
  estimatedDeliveryDate: Date = new Date();

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private cartSyncService: CartCheckoutSyncService,
    private toastr: ToastrService,
    private checkoutService: CheckoutService,
    private router: Router
  ) { }

  ngOnInit() {
    this.cartService.cartItems$.subscribe(cartItems => {
      this.cartItems = cartItems;
      this.loadDisplayedCartItems();
      // if (this.displayedCartItems.length === 0) {
      //   this.loadDisplayedCartItems();
      // }
    });

    this.cartSyncService.cartChanged$.subscribe(() => {
      this.loadDisplayedCartItems();
    });
  }

  private loadDisplayedCartItems() {
    this.displayedCartItems = [];

    for (const cartItem of this.cartItems) {
      this.productService.getProductById(cartItem.productId).subscribe(
        (product) => {
          const displayedItem: DisplayedCartItem = {
            cartItem: cartItem,
            product: product
          };

          if (!this.displayedCartItems.some(item => item.cartItem.cartItemId === displayedItem.cartItem.cartItemId)) {
            this.displayedCartItems.push(displayedItem);
          }

          // Check if all items are loaded
          //if (this.displayedCartItems.length === this.cartItems.length) {
          // All items are loaded, you can perform additional actions here
          //}
        },
        (error) => {
          console.error('Error fetching product:', error);
        }
      );
    }
  }

  constructImageUrl(imagePath: string): string {
    return `${environment.serverBaseUrl}${imagePath}`;
  }

  decrementQuantity(item: CartItem) {
    // if (item.quantity > 1) {
    const newQuantity = item.quantity - 1;
    this.updateCartItemQuantity(item.cartItemId, newQuantity);
    //} else {
    //  this.removeFromCart(item.cartItemId);
    //}
  }

  incrementQuantity(item: CartItem) {
    const newQuantity = item.quantity + 1;

    this.productService.getProductStock(item.productId).subscribe(
      (stock) => {
        if (newQuantity <= stock) {
          this.updateCartItemQuantity(item.cartItemId, newQuantity);
        } else {
          // Show Toastr notification for insufficient stock
          this.toastr.error(`Insufficient stock, only ${stock} left.`, 'Error');
        }
      },
      (error) => {
        console.error('Error checking product stock:', error);

        this.toastr.error(`An error occurred, ${error}`);
      }
    );
  }

  validateQuantity(displayedItem: DisplayedCartItem) {
    const newQuantity = displayedItem.cartItem.quantity;

    this.productService.getProductStock(displayedItem.product.productId).subscribe(
      (stock) => {
        if (newQuantity > stock) {
          // If the input value exceeds the stock, set it to the stock value
          displayedItem.cartItem.quantity = stock;

          // Show Toastr notification for insufficient stock
          this.toastr.error(`Insufficient stock, only ${stock} left.`, 'Error');
        }
      },
      (error) => {
        console.error('Error checking product stock:', error);

        this.toastr.error(`An error occurred, ${error}`);
      }
    );
  }

  private updateCartItemQuantity(cartItemId: number, newQuantity: number) {
    this.cartService.updateCartItemQuantity(cartItemId, newQuantity).subscribe(
      () => {
        this.toastr.success(`Succesfully updated you have ${newQuantity}`);
      },
      (error: any) => {
        this.toastr.error('An error occurred', 'Error');
      }
    );
  }

  // removeFromCart(cartItemId: number) {
  //   this.cartService.removeFromCart(cartItemId);
  // }
  removeFromCart(cartItemId: number, displayedItem: DisplayedCartItem) {
    this.cartService.removeFromCart(cartItemId);

    // Remove the displayed item from the displayedCartItems array
    const index = this.displayedCartItems.indexOf(displayedItem);
    if (index !== -1) {
      this.displayedCartItems.splice(index, 1);
    }
  }

  applyDiscount() {

  }

  calculateSubtotal(): number {
    return 0;
  }

  calculateTotalAfterDiscount(): number {
    return 0;
  }

  proceedToBilling() {
    this.checkoutService.setFinalizedItems(this.cartItems);
    this.router.navigate(['/billing']);
  }
}
