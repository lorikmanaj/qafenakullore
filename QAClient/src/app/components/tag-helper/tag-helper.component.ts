import { Component, OnInit } from '@angular/core';
import { ProductTag } from 'src/app/models/productTag';
import { TagsService } from 'src/app/services/tags.service';

@Component({
  selector: 'app-tag-helper',
  templateUrl: './tag-helper.component.html',
  styleUrls: ['./tag-helper.component.css']
})
export class TagHelperComponent implements OnInit {
  tags: ProductTag[] = [];
  showCreateNewTagForm: boolean = false;
  newTag: string = '';

  constructor(private tagsService: TagsService) { }

  ngOnInit() {
    this.tagsService.getAvailableTags().subscribe((tags) => {
      this.tags = tags;
    });
  }

  createNewTag() {
    if (this.newTag.trim() !== '') {
      const newTagId = this.tags.length + 1;
      const newTag: ProductTag = { tagId: newTagId, tag: this.newTag, selected: false, created: true };

      this.tagsService.addNewTag(newTag);
      this.newTag = '';
    }
  }

  check(tag: ProductTag) {
    tag.selected = true;
    this.tagsService.updateTag(tag);
  }

  unCheck(tag: ProductTag) {
    tag.selected = false;
    this.tagsService.updateTag(tag);
  }

  deleteTag(tag: ProductTag) {
    const index = this.tags.indexOf(tag);
    if (index !== -1) {
      const tagId = tag.tagId as number;
      this.tags.splice(index, 1);
      this.tagsService.removeTag(tagId);
    }
  }

}
