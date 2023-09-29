import { CartItem } from "./cartItem";

export interface Cart {
    cartId: number;
    userId: string;
    items: CartItem[];
}
