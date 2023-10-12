import { ProductTag } from "./productTag";
import { Variety } from "./variety";

export interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    image: string; // You can use a URL or a local path to an image
    bg: string;
    quantity: number;
    // galleries: Gallery
    varieties: Variety[];
    tags: ProductTag[];
}
