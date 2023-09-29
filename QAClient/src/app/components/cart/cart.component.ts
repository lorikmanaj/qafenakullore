import { Component, OnInit } from '@angular/core';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { CartService } from 'src/app/services/cart.service';
import { CartItem } from 'src/app/models/cartItem';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  faCart = faCartShopping;
  cartItems: CartItem[] = []; // Define an empty array to store cart items

  isCartOpen: boolean = false;

  constructor(
    private cartService: CartService
  ) { }

  ngOnInit() {
    // Subscribe to cart items from CartService
    this.cartService.getCartItems().subscribe((cartItems) => {
      this.cartItems = cartItems;
      console.log(cartItems); // Debugging: Check if cartItems are coming from the service
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
