import { Component, OnInit } from '@angular/core';
import { faCartShopping, faPlusSquare, faMinusSquare } from '@fortawesome/free-solid-svg-icons';
import { CartService } from 'src/app/services/cart.service';
import { CartItem } from 'src/app/models/cartItem';



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
  // isLoggedIn: boolean = false;


  cartItems: CartItem[] = []; // Define an empty array to store cart items



  constructor(
    private cartService: CartService,
    // private AuthenticationService: AuthenticationService // Inject AuthService here

  ) { }
  ngOnInit() {
    // Subscribe to cart items from CartService
    this.cartService.getCartItems().subscribe((cartItems) => {
      this.cartItems = cartItems;
      console.log(cartItems); // Debugging: Check if cartItems are coming from the service
      // this.isLoggedIn = this.AuthenticationService.isLoggedIn(); // Check if the user is logged in
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
