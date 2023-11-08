import { Injectable } from '@angular/core';
import { Tag } from '../models/tag';
import { BehaviorSubject, Observable } from 'rxjs';
import { ApiService } from './global/api.service';

@Injectable({
  providedIn: 'root'
})
export class TagsService {
  private tagsSubject = new BehaviorSubject<Tag[]>([
    { tagId: 1, title: '24H', selected: false },
    { tagId: 2, title: 'Sale', selected: false },
    { tagId: 3, title: 'Discount', selected: false }
  ]);
  tags$ = this.tagsSubject.asObservable();

  constructor(private apiService: ApiService) { }

  getAvailableTags(): Observable<Tag[]> {
    return this.apiService.get<Tag[]>('Tags');
    //return this.tags$;
  }

  getAvailableTagById(tagId: number): Tag | undefined {
    return this.tagsSubject.value.find((tag: Tag) => tag.tagId === tagId);
  }

  addNewTag(newTag: Tag): void {
    this.tagsSubject.next([...this.tagsSubject.value, newTag]);
  }

  updateTag(updatedTag: Tag): void {
    const updatedTags = this.tagsSubject.value.map((tag: Tag) => {
      if (tag.tagId === updatedTag.tagId) {
        return { ...tag, selected: updatedTag.selected };
      }
      return tag;
    });
    this.tagsSubject.next(updatedTags);
  }

  removeTag(tagId: number): void {
    const updatedTags = this.tagsSubject.value.filter((tag: Tag) => tag.tagId !== tagId);
    this.tagsSubject.next(updatedTags);
  }
}
