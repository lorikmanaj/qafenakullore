export interface CartItem {
    cartItemId: number;
    cartId: number;
    productId: number; // ID of the product in the cart
    itemName: string; // Name of the product
    quantity: number; // Quantity of the product
}