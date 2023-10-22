import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ProductTag } from 'src/app/models/productTag';

@Injectable({
  providedIn: 'root',
})
export class TagSelectionService {
  private selectedTagsSubject = new BehaviorSubject<ProductTag[]>([]);
  selectedTags$: Observable<ProductTag[]> = this.selectedTagsSubject.asObservable();

  constructor() { }

  setSelectedTags(tags: ProductTag[]): void {
    this.selectedTagsSubject.next(tags);
  }

  getSelectedTags(): ProductTag[] {
    return this.selectedTagsSubject.value;
  }
}
