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
  isLoggedIn: boolean = false; // Add isLoggedIn property

  cartItems: CartItem[] = []; // Define an empty array to store cart items

  constructor(
    private cartService: CartService,
    private userService: UserService // Inject UserService here
  ) { }

  ngOnInit() {
    this.userService.isAuthenticated$.subscribe((isAuthenticated: boolean) => {
      this.isLoggedIn = isAuthenticated;
  
      if (isAuthenticated) {
        this.cartService.getCartItems().subscribe((cartItems: CartItem[]) => {
          this.cartItems = cartItems;
          console.log(cartItems);
        });
      }
    });
  }
  
  showCartItems() {
    this.isCartOpen = true;
  }

  hideCartItems() {
    this.isCartOpen = false;
  }

  addToCart(productId: number) {
    this.cartService.addToCart(productId);
  }

  removeFromCart(productId: number) {
    this.cartService.removeFromCart(productId);
  }
}
