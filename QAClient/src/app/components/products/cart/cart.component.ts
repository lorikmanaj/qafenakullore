import { Component, OnInit } from '@angular/core';
import { faCartShopping, faPlusSquare, faMinusSquare } from '@fortawesome/free-solid-svg-icons';
import { CartService } from 'src/app/services/products/cart.service';
import { CartItem } from 'src/app/models/cartItem';
import { UserService } from 'src/app/services/user.service';

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
  private hasInitialized: boolean = false;

  constructor(
    private cartService: CartService,
    private userService: UserService
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

  addToCart(productId: number) {
    this.cartService.addToCart(productId);
    //this.loadCartItems();
  }

  removeFromCart(productId: number) {
    this.cartService.removeFromCart(productId);
    //this.loadCartItems();
  }
}
