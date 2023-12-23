import { CartItem } from "./cartItem";
import { Product } from "./product";

export interface DisplayedCartItem {
    cartItem: CartItem;
    product: Product;
}