import { Product } from "./product";
import { Slider } from "./slider";

export interface SliderItem {
    sliderItemId: number;
    sliderId: number;
    productId: number;

    slider?: Slider;
    product?: Product;
}