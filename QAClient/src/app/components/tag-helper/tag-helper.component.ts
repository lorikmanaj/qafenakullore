import { Component } from '@angular/core';
import { ProductTag } from 'src/app/models/productTag';

@Component({
  selector: 'app-tag-helper',
  templateUrl: './tag-helper.component.html',
  styleUrls: ['./tag-helper.component.css']
})
export class TagHelperComponent {
  availableTags: ProductTag[] = [
    { tagId: 1, tag: '24H', selected: false },
    { tagId: 2, tag: 'Sale', selected: false },
    { tagId: 3, tag: 'Discount', selected: false }
  ];

  tags: ProductTag[] = [];

  addNewTag() {
    this.tags.unshift({ tagId: this.availableTags.length + 1, tag: '', selected: true, created: false });
  }

  createNewTag(tag: ProductTag, index: number) {
    if (tag.tag.trim() !== '') {
      this.tags.splice(index, 1);

      const newTagId = this.availableTags.length + 1;
      this.availableTags.push({ tagId: newTagId, tag: tag.tag, selected: false });

      tag.tag = '';
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
