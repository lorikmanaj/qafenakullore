import { Gallery } from "./gallery";
import { ItemGallery } from "./itemGallery";
import { ProductReview } from "./productReview";
import { ProductType } from "./productType";
import { Tag } from "./tag";
import { Variety } from "./variety";

export interface Product {
    productId: number;
    typeId: number;
    name: string;
    description: string;
    price: number;
    mainImage: string;
    mainImageBlob: string;
    background: string;
    bgImageBlob: string;
    quantity: number; //Remove mas promo-product
    stock?: number;

    type?: ProductType;
    // galleries: Gallery
    varieties?: Variety[];
    tags?: Tag[];
    galleries?: Gallery[];
    productReviews?: ProductReview[];
    itemGalleries?: ItemGallery[];

    //Change
    mainImg64?: string;
    bgImg64?: string;
    galleryBase64?: string[];
    varietyBase64?: string[];
}
