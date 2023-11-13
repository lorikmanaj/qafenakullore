import { Component, Inject, Input } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ItemGalleryService } from 'src/app/services/products/item-gallery.service';
import { OnInit } from '@angular/core';
import { ItemGallery } from 'src/app/models/itemGallery';
import { environment } from 'src/app/environments/environment';

@Component({
  selector: 'app-prod-gallery-editor',
  templateUrl: './prod-gallery-editor.component.html',
  styleUrls: ['./prod-gallery-editor.component.css']
})
export class ProdGalleryEditorComponent implements OnInit {
  galleryImages: ItemGallery[] = [];

  constructor(
    public dialogRef: MatDialogRef<ProdGalleryEditorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private itemGalleryService: ItemGalleryService,
  ) { }

  ngOnInit(): void {
    this.fetchProductGallery();
  }

  fetchProductGallery() {
    const productId = this.data.product.productId;

    this.itemGalleryService.getProductGallery(productId).subscribe(
      (galleryImages: ItemGallery[]) => {
        this.galleryImages = galleryImages;
        console.log('Fetched Gallery Images:', galleryImages);
      },
      (error) => {
        console.error('Error fetching gallery images:', error);
      }
    );
  }

  constructImageUrl(imagePath: string): string {
    return `${environment.serverBaseUrl}${imagePath}`;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  deleteItem(itemId: number) {

  }
}
