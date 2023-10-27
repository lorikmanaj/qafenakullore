import { ProductTag } from "./productTag";
import { Variety } from "./variety";

export interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    mainImage: string; // You can use a URL or a local path to an image
    bg: string;
    quantity: number;
    // galleries: Gallery
    varieties: Variety[];
    tags: ProductTag[];

    //Change
    mainImg64?: string;
    bgImg64?: string;
    galleryBase64?: string[];
    varietyBase64?: string[];
}
