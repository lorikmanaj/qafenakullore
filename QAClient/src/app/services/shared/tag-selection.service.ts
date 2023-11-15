import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Tag } from '../../models/tag';

@Injectable({
  providedIn: 'root',
})
export class TagSelectionService {
  private selectedTagsSubject = new BehaviorSubject<Tag[]>([]);
  selectedTags$: Observable<Tag[]> = this.selectedTagsSubject.asObservable();

  constructor() { }

  setSelectedTags(tags: Tag[]): void {
    this.selectedTagsSubject.next(tags);
  }

  getSelectedTags(): Tag[] {
    return this.selectedTagsSubject.value;
  }
}
