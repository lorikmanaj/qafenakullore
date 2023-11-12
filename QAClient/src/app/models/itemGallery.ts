import { Gallery } from "./gallery";
import { Product } from "./product";

export interface ItemGallery {
    itemGalleryId: number;
    galleryId: number;
    productId: number;
    imageUrl: string;
    imageBlob: string;

    gallery: Gallery[];
    product: Product[];
}