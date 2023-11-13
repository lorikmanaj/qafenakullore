import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { MatDialog } from '@angular/material/dialog';
import { ProdGalleryEditorComponent } from '../prod-gallery-editor/prod-gallery-editor.component';
import { ProdReviewEditorComponent } from '../prod-review-editor/prod-review-editor.component';
import { ProductService } from 'src/app/services/products/product.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { ProdCreateComponent } from '../prod-create/prod-create.component';
import { VarietyComponent } from '../variety/variety.component';

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

  private serverBaseUrl = 'https://localhost:7069/';

  constructor(
    private productService: ProductService,
    private dialog: MatDialog) {

  }

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.productService.getProducts().subscribe((products) => {
      console.log('Products', products);
      this.products = products;
      this.paginateProducts();
    });
  }

  constructImageUrl(imagePath: string): string {
    return `${this.serverBaseUrl}${imagePath}`;
  }

  paginateProducts() {
    if (this.products && this.products.length > 0) {
      const startIndex = (this.page - 1) * this.pageSize;
      this.paginatedProducts = this.products.slice(startIndex, startIndex + this.pageSize);
    }
  }

  openVarietyEditor(product: Product) {
    const dialogRef = this.dialog.open(VarietyComponent, {
      data: { product: product },
    });

    dialogRef.afterClosed().subscribe((result) => {

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

  openProductCreate() {
    const dialogRef = this.dialog.open(ProdCreateComponent, {});

    dialogRef.afterClosed().subscribe((createdProduct: Product) => {
      this.loadProducts();
    });
  }


  editProduct(product: Product) {

  }

  deleteProduct(product: Product) {

  }
}
