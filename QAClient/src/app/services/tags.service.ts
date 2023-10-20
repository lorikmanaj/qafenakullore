import { Injectable } from '@angular/core';
import { ProductTag } from '../models/productTag';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TagsService {
  private tagsSubject = new BehaviorSubject<ProductTag[]>([
    { tagId: 1, tag: '24H', selected: false },
    { tagId: 2, tag: 'Sale', selected: false },
    { tagId: 3, tag: 'Discount', selected: false }
  ]);
  tags$ = this.tagsSubject.asObservable();

  constructor() { }

  getAvailableTags(): Observable<ProductTag[]> {
    return this.tags$;
  }

  getAvailableTagById(tagId: number): ProductTag | undefined {
    return this.tagsSubject.value.find((tag: ProductTag) => tag.tagId === tagId);
  }

  addNewTag(newTag: ProductTag): void {
    this.tagsSubject.next([...this.tagsSubject.value, newTag]);
  }

  updateTag(updatedTag: ProductTag): void {
    const updatedTags = this.tagsSubject.value.map((tag: ProductTag) => {
      if (tag.tagId === updatedTag.tagId) {
        return { ...tag, selected: updatedTag.selected };
      }
      return tag;
    });
    this.tagsSubject.next(updatedTags);
  }

  removeTag(tagId: number): void {
    const updatedTags = this.tagsSubject.value.filter((tag: ProductTag) => tag.tagId !== tagId);
    this.tagsSubject.next(updatedTags);
  }
}
