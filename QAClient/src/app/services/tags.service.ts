import { Injectable } from '@angular/core';
import { ProductTag } from '../models/productTag';

@Injectable({
  providedIn: 'root'
})
export class TagsService {
  availableTags: ProductTag[] = [
    { tagId: 1, tag: '24H', selected: false },
    { tagId: 2, tag: 'Sale', selected: false },
    { tagId: 3, tag: 'Discount', selected: false }
  ];

  constructor() { }
}
