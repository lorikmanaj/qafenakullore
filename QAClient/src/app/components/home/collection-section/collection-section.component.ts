import { Component } from '@angular/core';
import { Product } from 'src/app/models/product';
import { SliderItem } from 'src/app/models/sliderItem';

@Component({
  selector: 'app-collection-section',
  templateUrl: './collection-section.component.html',
  styleUrls: ['./collection-section.component.css']
})
export class CollectionSectionComponent {
  carouselProducts: Product[] = [];
  sliderItems: SliderItem[] = [];

}
