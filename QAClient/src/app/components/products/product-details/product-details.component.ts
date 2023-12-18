import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/app/environments/environment';
import { Product } from 'src/app/models/product';
import { ReviewDetails } from 'src/app/models/reviewDetails';
import { Variety } from 'src/app/models/variety';
import { ProductService } from 'src/app/services/products/product.service';
import {
  faCartPlus,
  faCartArrowDown,
  faHeart,
  faHeartBroken
} from '@fortawesome/free-solid-svg-icons';
import { CartService } from 'src/app/services/products/cart.service';
import { WishlistService } from 'src/app/services/products/wishlist.service';
import { AddToCartRequest } from 'src/app/models/RequestDTOs/addToCartRequest';
import { CartItem } from 'src/app/models/cartItem';
import { WishListItem } from 'src/app/models/wishListItem';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit, OnDestroy {
  product: Product | undefined;
  reviewDetails: ReviewDetails | undefined;

  //private cartChangedSubscription: Subscription | undefined;

  detailsGallery: string[] = [];

  /* Slider Images  */
  currentImage: string | undefined;
  defaultImageUrl: string = ''; // Set a default image URL

  //Icons
  faAddToCart = faCartPlus;
  faRemoveFromCart = faCartArrowDown;

  addWish = faHeart;
  removeWish = faHeartBroken;

  //selectedQuantity: number = 1;
  selectedTab: string = 'description';

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService,
    private wishListService: WishlistService,
    private toaster: ToastrService
  ) { }

  ngOnInit() {
    // Get the product ID from the route parameters
    this.route.paramMap.subscribe(params => {
      const productId = params.get('id');

      if (productId) {
        this.productService.getProductById(+productId).subscribe(
          product => {
            this.product = product;
            // Set the initial image
            this.currentImage = product.mainImage;

            // if (this.isInCart()) {
            //   const cartItem = this.cartService.getCartItemByProductId(product.productId);

            //   // if (cartItem) {
            //   //   this.selectedQuantity = cartItem.quantity;
            //   // }
            // } else {
            //   this.selectedQuantity = 0; // If not in cart, initialize selectedQuantity to 0
            // }
          },
          error => {
            console.error('Error fetching product details:', error);
          }
        );
      }
    });

    this.currentImage = this.product?.mainImage;

    // this.cartChangedSubscription = this.cartService.cartChanged.subscribe(() => {
    //   if (this.product) {
    //     if (this.isInCart()) {
    //       const cartItem = this.cartService.getCartItemByProductId(this.product.productId);

    //       // if (cartItem) {
    //       //   this.selectedQuantity = cartItem.quantity;
    //       // }
    //     } else {
    //       //this.selectedQuantity = 1;
    //     }
    //   }
    // });
  }

  ngOnDestroy() {
    // if (this.cartChangedSubscription) {
    //   this.cartChangedSubscription.unsubscribe();
    // }
  }

  changeTab(tab: string): void {
    this.selectedTab = tab;
  }

  changeImage(imageUrl: string) {
    this.currentImage = imageUrl;
  }

  constructImageUrl(imagePath: string | undefined): string {
    return `${environment.serverBaseUrl}${imagePath}`;
  }

  // updateQuantity(newQuantity: number): void {
  //   if (this.product) {
  //     if (this.isInCart()) {
  //       const cartItem = this.cartService.getCartItemByProductId(this.product.productId);
  //       if (cartItem) {
  //         if (newQuantity > this.product.quantity) {
  //           this.toaster.error(`Cannot add more. Maximum stock quantity reached.`);
  //         } else {
  //           this.cartService.updateCartItemQuantity(cartItem.cartItemId, newQuantity).subscribe(
  //             () => {
  //               this.toaster.success(`You have ${newQuantity} of this in your cart.`);
  //             },
  //             (error: any) => {
  //               this.toaster.error('Error updating item quantity in the cart');
  //             }
  //           );
  //         }
  //       }
  //     } else {
  //       // If the product is not in the cart, update the selectedQuantity
  //       this.selectedQuantity = newQuantity;
  //     }
  //   }
  // }

  // updateQuantity(newQuantity: number): void {
  //   if (this.product) {
  //     if (this.isInCart()) {
  //       const cartItem = this.cartService.getCartItemByProductId(this.product.productId);

  //       if (cartItem) {
  //         if (newQuantity === 0) {
  //           // If newQuantity is 0, remove from cart
  //           this.removeFromCart(this.product.productId);
  //         } else {
  //           // Update the cart item quantity
  //           this.cartService.updateCartItemQuantity(cartItem.cartItemId, newQuantity).subscribe(
  //             () => {
  //               this.toaster.success(`You have ${newQuantity} of this in your cart.`);
  //             },
  //             (error: any) => {
  //               this.toaster.error('Error updating item quantity in the cart');
  //             }
  //           );
  //         }
  //       }
  //     } else {
  //       // If the product is not in the cart, update the selectedQuantity
  //       this.selectedQuantity = newQuantity;
  //     }
  //   }
  // }

  // decrementQuantity() {
  //   if (this.selectedQuantity > 1) {
  //     this.selectedQuantity--;
  //   }
  // }

  // decrementQuantity() {
  //   if (this.product) {
  //     if (this.isInCart()) {
  //       const cartItem = this.cartService.getCartItemByProductId(this.product.productId);

  //       if (cartItem) {
  //         if (cartItem.quantity === 1) {
  //           // If quantity is 1, remove from cart
  //           this.removeFromCart(this.product.productId);
  //         } else if (cartItem.quantity > 1) {
  //           // If quantity > 1, decrement the quantity
  //           const newQuantity = cartItem.quantity - 1;
  //           this.cartService.updateCartItemQuantity(cartItem.cartItemId, newQuantity).subscribe(
  //             () => {
  //               this.toaster.success('Item quantity updated in the cart.');
  //               this.selectedQuantity = newQuantity;
  //             },
  //             (error: any) => {
  //               this.toaster.error('Error updating item quantity in the cart');
  //             }
  //           );
  //         }
  //       }
  //     } else {
  //       // If the product is not in the cart, decrement the selectedQuantity
  //       if (this.selectedQuantity > 1) {
  //         this.selectedQuantity--;
  //       }
  //     }
  //   }
  // }

  // incrementQuantity() {
  //   this.selectedQuantity++;
  // }

  // incrementQuantity() {
  //   if (this.product) {
  //     if (this.isInCart()) {
  //       const cartItem = this.cartService.getCartItemByProductId(this.product.productId);
  //       if (cartItem && cartItem.quantity < this.product.quantity) {
  //         // If quantity < stockQuantity, increment the quantity
  //         const newQuantity = cartItem.quantity + 1;
  //         this.cartService.updateCartItemQuantity(cartItem.cartItemId, newQuantity).subscribe(
  //           () => {
  //             this.toaster.success('Item quantity updated in the cart.');
  //             this.selectedQuantity = newQuantity;
  //           },
  //           (error: any) => {
  //             this.toaster.error('Error updating item quantity in the cart');
  //           }
  //         );
  //       } else if (cartItem && cartItem.quantity >= this.product.quantity) {
  //         // Show Toastr notification for exceeding stock quantity
  //         this.toaster.error(`Cannot add more. Maximum stock quantity reached.`);
  //       }
  //     } else {
  //       // If the product is not in the cart, increment the selectedQuantity
  //       if (this.selectedQuantity < this.product.quantity) {
  //         this.selectedQuantity++;
  //       } else {
  //         // Show Toastr notification for exceeding stock quantity
  //         this.toaster.error(`Cannot add more. Maximum stock quantity reached.`);
  //       }
  //     }
  //   }
  // }

  isInCart(): boolean {
    if (this.product) {
      return this.cartService.isInCart(this.product.productId);
    }
    return false;
  }

  addToCart() {
    if (this.product) {
      const req: AddToCartRequest = {
        productId: this.product.productId,
        cartId: 0,
        quantity: 1
      };

      // Check stock before adding to cart
      this.productService.getProductStock(this.product.productId).subscribe(
        (stock) => {
          if (stock > 0) {
            // If there is enough stock, add to cart
            this.cartService.addToCart(req).subscribe(
              (addedItem: CartItem) => {
                this.toaster.success('Item added to the cart.');
                //this.selectedQuantity = addedItem.quantity;
              },
              (error: any) => {
                this.toaster.error('Error adding item to the cart.');
              }
            );
          } else {
            // Show Toastr notification for insufficient stock
            this.toaster.error(`Insufficient stock, only ${stock} left.`, 'Error');
          }
        },
        (error: any) => {
          console.error('Error fetching product stock:', error);
          this.toaster.error('Error fetching product stock.', 'Error');
        }
      );
    }
  }

  removeFromCart(productId: number) {
    this.cartService.getCartItemIdByProductId(productId).subscribe(
      (cartItemId: number | null) => {
        if (cartItemId !== null) {
          this.cartService.removeFromCart(cartItemId);
          this.toaster.success('Item removed from the cart.');
          //this.selectedQuantity = 0; // Reset selectedQuantity when removing from cart
        } else {
          this.toaster.error('Error removing item from the cart.');
        }
      },
      (error: any) => {
        this.toaster.error('Error removing item from the cart.');
      }
    );
  }

  //wishlist
  isInWishList(): boolean {
    if (this.product) {
      return this.wishListService.isInWishlist(this.product.productId);
    }
    return false;
  }

  addToWishList() {
    if (this.product) {
      this.wishListService.addWishListItem({
        productId: this.product.productId,
        wishListId: 0,
      }).subscribe(
        (addedItem: WishListItem) => {
          this.toaster.success('Item added to wishlist.');
        },
        (error: any) => {
          this.toaster.error('Error adding item to wishlist.');
        }
      );
    }
  }

  removeFromWishList() {
    if (this.product) {
      const wishListItem = this.wishListService.getWishListItemByProductId(this.product.productId);

      if (wishListItem) {
        const wishListItemId = wishListItem.wishListItemId;

        this.wishListService.removeWishListItem(wishListItemId);
        this.toaster.success('Item removed from wishlist.');
      } else {
        this.toaster.error('WishListItem not found for product.');
      }
    }
  }
}
