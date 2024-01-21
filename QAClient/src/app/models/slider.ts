import { SliderItem } from "./sliderItem";

export interface Slider {
    sliderId: number;
    title: string;

    sliderItems: SliderItem[];
}