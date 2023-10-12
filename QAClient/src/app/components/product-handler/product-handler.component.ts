import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { MatDialog } from '@angular/material/dialog';
import { ProdGalleryEditorComponent } from '../prod-gallery-editor/prod-gallery-editor.component';
import { ProdVarietyEditorComponent } from '../prod-variety-editor/prod-variety-editor.component';
import { ProdReviewEditorComponent } from '../prod-review-editor/prod-review-editor.component';
import { ProductService } from 'src/app/services/product.service';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-product-handler',
  templateUrl: './product-handler.component.html',
  styleUrls: ['./product-handler.component.css']
})
export class ProductHandlerComponent {
  products: Product[] = [];
  pageSize: number = 20;
  page: number = 1;
  paginatedProducts: Product[] = [];

  constructor(private productService: ProductService,
    private dialog: MatDialog) {

  }

  ngOnInit() {
    this.productService.getProducts().subscribe((products) => {
      this.products = products;
      this.paginatedProducts = this.products.slice(0, this.pageSize); // Initial page
    });
  }

  paginateProducts() {
    const startIndex = (this.page - 1) * this.pageSize;
    this.paginatedProducts = this.products.slice(startIndex, startIndex + this.pageSize);
  }

  openVarietyEditor(product: Product) {
    // Open the ProdVarietyEditorComponent as a dialog
    const dialogRef = this.dialog.open(ProdVarietyEditorComponent, {
      data: { product: product },
    });

    dialogRef.afterClosed().subscribe((result) => {
      // Handle any actions when the dialog is closed, if needed
    });
  }

  openGalleryEditor(product: Product) {
    const dialogRef = this.dialog.open(ProdGalleryEditorComponent, {
      data: { product: product },
    });

    dialogRef.afterClosed().subscribe((result) => {
      // Handle any actions when the dialog is closed, if needed
    });
  }

  openReviewsModal(product: Product) {
    const dialogRef = this.dialog.open(ProdReviewEditorComponent, {
      data: { product: product },
    });

    dialogRef.afterClosed().subscribe((result) => {
      // Handle any actions when the dialog is closed, if needed
    });
  }

  editProduct(product: Product) {

  }

  deleteProduct(product: Product) {

  }
}
