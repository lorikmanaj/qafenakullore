import { Component, OnInit } from '@angular/core';
import { ProductTag } from 'src/app/models/productTag';
import { TagsService } from 'src/app/services/tags.service';
import { TagSelectionService } from './../../services/tag-selection.service';

@Component({
  selector: 'app-tag-helper',
  templateUrl: './tag-helper.component.html',
  styleUrls: ['./tag-helper.component.css']
})
export class TagHelperComponent implements OnInit {
  tags: ProductTag[] = [];
  showCreateNewTagForm: boolean = false;
  newTag: string = '';

  constructor(private tagsService: TagsService,
    private tagSelectionService: TagSelectionService) { }

  ngOnInit() {
    this.tagsService.getAvailableTags().subscribe((tags) => {
      this.tags = tags;
    });
  }

  createNewTag() {
    if (this.newTag.trim() !== '') {
      const newTagId = this.tags.length + 1;
      const newTag: ProductTag = { tagId: newTagId, title: this.newTag, selected: false, created: true };

      this.tagsService.addNewTag(newTag);
      this.newTag = '';
    }
  }

  check(tag: ProductTag) {
    tag.selected = true;
    this.tagsService.updateTag(tag);
    const selectedTags = this.tagSelectionService.getSelectedTags();
    this.tagSelectionService.setSelectedTags([...selectedTags, tag]);
  }

  unCheck(tag: ProductTag) {
    tag.selected = false;
    this.tagsService.updateTag(tag);
    const selectedTags = this.tagSelectionService.getSelectedTags();
    const updatedSelectedTags = selectedTags.filter((selectedTag) => selectedTag.tagId !== tag.tagId);
    this.tagSelectionService.setSelectedTags(updatedSelectedTags);
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
