import { Injectable } from '@angular/core';
import { Tag } from '../../models/tag';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { ApiService } from '../global/api.service';

@Injectable({
  providedIn: 'root'
})
export class TagsService {
  //project it with selected: false on get
  private tagsSubject = new BehaviorSubject<Tag[]>([]);
  tags$ = this.tagsSubject.asObservable();

  constructor(private apiService: ApiService) { }

  getAvailableTags(): Observable<Tag[]> {
    return this.apiService.get<Tag[]>('Tags').pipe(
      tap(tags => this.tagsSubject.next(tags))
    );
    //return this.tags$;
  }

  getAvailableTagById(tagId: number): Tag | undefined {
    return this.tagsSubject.value.find((tag: Tag) => tag.tagId === tagId);
  }

  addNewTag(newTag: Tag): Observable<Tag> {
    return this.apiService.post<Tag, Tag>('Tags', newTag);
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

  removeTag(tagId: number): Observable<any> {
    return this.apiService.delete<any>(`Tags/${tagId}`);
  }

  // removeTag(tagId: number): void {
  //   const updatedTags = this.tagsSubject.value.filter((tag: Tag) => tag.tagId !== tagId);
  //   this.tagsSubject.next(updatedTags);
  // }
}
