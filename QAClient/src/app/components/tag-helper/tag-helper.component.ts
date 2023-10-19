import { Component } from '@angular/core';
import { ProductTag } from 'src/app/models/productTag';

@Component({
  selector: 'app-tag-helper',
  templateUrl: './tag-helper.component.html',
  styleUrls: ['./tag-helper.component.css']
})
export class TagHelperComponent {
  tags: ProductTag[] = [
    { tagId: 1, tag: '24H', selected: false, created: false },
    { tagId: 2, tag: 'Sale', selected: false, created: false },
    { tagId: 3, tag: 'Discount', selected: false, created: false }
  ];

  showCreateNewTagForm: boolean = false;
  newTag: string = '';

  createNewTag() {
    if (this.newTag.trim() !== '') {
      const newTagId = this.tags.length + 1;
      const newTag: ProductTag = { tagId: newTagId, tag: this.newTag, selected: false, created: true };
      this.tags.push(newTag);
      this.newTag = '';
    }
  }

  check(tag: ProductTag) {
    tag.selected = true;
  }

  unCheck(tag: ProductTag) {
    tag.selected = false;
  }

  deleteTag(index: number) {
    this.tags.splice(index, 1);
  }
}
