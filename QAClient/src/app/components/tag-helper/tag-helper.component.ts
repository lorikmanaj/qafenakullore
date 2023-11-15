import { Component, OnInit } from '@angular/core';
import { Tag } from 'src/app/models/tag';
import { TagsService } from 'src/app/services/products/tags.service';
import { TagSelectionService } from '../../services/shared/tag-selection.service';

@Component({
  selector: 'app-tag-helper',
  templateUrl: './tag-helper.component.html',
  styleUrls: ['./tag-helper.component.css']
})
export class TagHelperComponent implements OnInit {
  tags: Tag[] = [];
  showCreateNewTagForm: boolean = false;
  newTag: string = '';

  constructor(private tagsService: TagsService,
    private tagSelectionService: TagSelectionService) { }

  ngOnInit() {
    this.tagsService.getAvailableTags().subscribe((tags) => {
      this.tags = tags;
      console.log(this.tags);
    });
  }

  createNewTag() {
    if (this.newTag.trim() !== '') {
      const newTag: Tag = { title: this.newTag, selected: false, created: true };

      this.tagsService.addNewTag(newTag).subscribe(
        (createdTag: Tag) => {
          newTag.tagId = createdTag.tagId;

          this.tags = [...this.tags, newTag];
          this.newTag = '';
        },
        (error: any) => {
          console.error('Error creating tag:', error);
        }
      );
    }
  }

  check(tag: Tag) {
    tag.selected = true;
    this.tagsService.updateTag(tag);
    const selectedTags = this.tagSelectionService.getSelectedTags();
    this.tagSelectionService.setSelectedTags([...selectedTags, tag]);
  }

  unCheck(tag: Tag) {
    tag.selected = false;
    this.tagsService.updateTag(tag);
    const selectedTags = this.tagSelectionService.getSelectedTags();
    const updatedSelectedTags = selectedTags.filter((selectedTag) => selectedTag.tagId !== tag.tagId);
    this.tagSelectionService.setSelectedTags(updatedSelectedTags);
  }

  deleteTag(tag: Tag) {
    const tagId = tag.tagId as number;

    // Remove tag locally
    const index = this.tags.indexOf(tag);
    if (index !== -1) {
      this.tags.splice(index, 1);
    }

    // Delete tag from server
    this.tagsService.removeTag(tagId).subscribe(
      () => {
        console.log('Tag deleted successfully.');
      },
      (error) => {
        console.error('Error deleting tag:', error);
      }
    );
  }

}
