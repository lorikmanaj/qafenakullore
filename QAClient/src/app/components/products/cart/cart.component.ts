import { Component, OnInit } from '@angular/core';
import { faCartShopping, faPlusSquare, faMinusSquare } from '@fortawesome/free-solid-svg-icons';
import { CartService } from 'src/app/services/products/cart.service';
import { CartItem } from 'src/app/models/cartItem';
import { UserService } from 'src/app/services/user.service';
import { AddToCartRequest } from 'src/app/models/RequestDTOs/addToCartRequest';
import { throwError } from 'rxjs';
import { ProductService } from 'src/app/services/products/product.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  faCart = faCartShopping;
  faPlus = faPlusSquare;
  faMinus = faMinusSquare;
  isCartOpen: boolean = false;
  isLoggedIn: boolean = false;

  cartItems: CartItem[] = [];
  errors: { [key: number]: string } = {};
  private hasInitialized: boolean = false;

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private userService: UserService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.userService.isAuthenticated$.subscribe((isAuthenticated: boolean) => {
      this.isLoggedIn = isAuthenticated;

      if (isAuthenticated && !this.hasInitialized) {
        this.cartService.initCartData();

        this.cartService.cartItems$.subscribe((cartItems: CartItem[]) => {
          this.cartItems = cartItems;
          console.log('Cart Items', this.cartItems);
        });

        this.hasInitialized = true;
      } else {
        // Handle the case when the user is not authenticated, if needed
      }
    });
  }

  showCartItems() {
    this.isCartOpen = true;
    //this.loadCartItems();
  }

  hideCartItems() {
    this.isCartOpen = false;
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
        // Show Toastr notification for other errors
        this.toastr.error('An error occurred', 'Error');
      }
    );
  }  

  decrementOrDelete(item: CartItem) {
    if (item.quantity > 1) {
      const newQuantity = item.quantity - 1;
      this.updateCartItemQuantity(item.cartItemId, newQuantity);
    } else {
      this.removeFromCart(item.cartItemId);
    }
  }

  // editQuantity(item: CartItem) {
  //   const newQuantity = parseInt(prompt('Enter new quantity:', item.quantity.toString()) || '1', 10);
  //   if (!isNaN(newQuantity) && newQuantity > 0) {
  //     this.updateCartItemQuantity(item.cartItemId, newQuantity);
  //   } else {
  //     alert('Invalid quantity. Please enter a valid number greater than 0.');
  //   }
  // }

  editQuantity(item: CartItem, event: any) {
    const newQuantity = parseInt(event.target.innerText, 10);

    this.productService.getProductStock(item.productId).subscribe(
      (stock) => {
        if (newQuantity <= stock) {
          this.updateCartItemQuantity(item.cartItemId, newQuantity);
        } else {
          // Show Toastr notification
          this.toastr.error(`Insufficient stock, only ${stock} left.', 'Error`);
          event.target.innerText = item.quantity.toString();
        }
      },
      (error) => {
        console.error('Error checking product stock:', error);
        // Show Toastr notification for other errors
        this.toastr.error('An error occurred', 'Error');
      }
    );
  }

  private updateCartItemQuantity(cartItemId: number, newQuantity: number) {
    this.cartService.updateCartItemQuantity(cartItemId, newQuantity).subscribe(
      () => {
        // Handle success if needed
      },
      (error: any) => {
        // Handle error if needed
      }
    );
  }

  addToCart(productId: number) {
    const req: AddToCartRequest = {
      cartId: 0,
      productId: productId
    }

    this.cartService.addToCart(req).subscribe(
      (addedItem: CartItem) => {
        // Handle logic specific to the cart component (if needed)
      },
      (error: any) => {
        // Handle error if needed
      }
    );
    //this.loadCartItems();
  }

  removeFromCart(cartItemId: number) {
    this.cartService.removeFromCart(cartItemId);
    //this.loadCartItems();
  }
}
