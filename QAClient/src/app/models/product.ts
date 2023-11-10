import { Tag } from "./tag";
import { Variety } from "./variety";

export interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    mainImage: string; // You can use a URL or a local path to an image
    mainImageBlob: string;
    background: string;
    bgImageBlob: string;
    quantity: number;
    // galleries: Gallery
    varieties: Variety[];
    tags: Tag[];

    //Change
    mainImg64?: string;
    bgImg64?: string;
    galleryBase64?: string[];
    varietyBase64?: string[];
}
