import { Product } from "./product";
import { User } from "./user";

export interface ProductReview {
    prodRevId: number;
    productId: number;
    userId: string;
    comment: string;
    rating: number;
    dateReviewed: Date;

    product?: Product;
    user?: User;
}