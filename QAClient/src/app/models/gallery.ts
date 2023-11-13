import { Product } from "./product";

export interface Gallery {
    galleryId: number;
    productId: number;

    product: Product;
}