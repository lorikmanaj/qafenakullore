// wishlist.component.ts
import { Component, OnInit } from '@angular/core';
import { WishlistService } from 'src/app/services/products/wishlist.service'; // Adjust the path accordingly
import { WishListItem } from 'src/app/models/wishListItem'; // Adjust the path accordingly
import { UserService } from 'src/app/services/user.service';
import {
  faHeart
} from '@fortawesome/free-solid-svg-icons';
import { take } from 'rxjs';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {
  // Adjust icons based on your FontAwesome icons
  isWishlistOpen: boolean = false;
  isLoggedIn: boolean = false;
  faHeart = faHeart;


  wishlistItems: WishListItem[] = [];
  private hasInitialized: boolean = false;

  constructor(
    private wishlistService: WishlistService, // Adjust the service accordingly
    private userService: UserService
  ) { }

  ngOnInit() {
    this.userService.isAuthenticated$
      .subscribe((isAuthenticated: boolean) => {
        this.isLoggedIn = isAuthenticated;

        if (isAuthenticated && !this.hasInitialized) {
          this.wishlistService.initWishlistData();

          this.wishlistService.wishListItems$.subscribe((wishlistItems: WishListItem[]) => {
            this.wishlistItems = wishlistItems;
            console.log('Wishlist Items', this.wishlistItems);
          });

          this.hasInitialized = true;
        } else {
          // Handle the case when the user is not authenticated, if needed
        }
      });
  }

  showWishlistItems() {
    this.isWishlistOpen = true;
    // Additional logic if needed
  }

  hideWishlistItems() {
    this.isWishlistOpen = false;
    // Additional logic if needed
  }

  // Additional methods for adding/removing items from the wishlist if needed
}
