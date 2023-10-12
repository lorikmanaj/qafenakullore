import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-prod-gallery-editor',
  templateUrl: './prod-gallery-editor.component.html',
  styleUrls: ['./prod-gallery-editor.component.css']
})
export class ProdGalleryEditorComponent {
  constructor(
    public dialogRef: MatDialogRef<ProdGalleryEditorComponent>, // or ProdGalleryEditorComponent
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
