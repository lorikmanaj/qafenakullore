import { Component, OnInit } from '@angular/core';
import { environment } from 'src/app/environments/environment';
import { CartService } from 'src/app/services/products/cart.service';
import { CartItem } from 'src/app/models/cartItem';
import { ProductService } from 'src/app/services/products/product.service';
import { DisplayedCartItem } from './../../models/displayedCartItem';
import { Product } from 'src/app/models/product';
import { ToastrService } from 'ngx-toastr';

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
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.cartService.cartItems$.subscribe(cartItems => {
      this.cartItems = cartItems;

      if (this.displayedCartItems.length === 0) {
        this.loadDisplayedCartItems();
      }
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

  decrementOrDelete(item: CartItem) {
    if (item.quantity > 1) {
      const newQuantity = item.quantity - 1;
      this.updateCartItemQuantity(item.cartItemId, newQuantity);
    } else {
      this.removeFromCart(item.cartItemId);
    }
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

  removeFromCart(cartItemId: number) {
    this.cartService.removeFromCart(cartItemId);
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

  }
}
