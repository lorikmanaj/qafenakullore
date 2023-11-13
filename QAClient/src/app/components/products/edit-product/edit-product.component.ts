import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { environment } from 'src/app/environments/environment';
import { ItemGallery } from 'src/app/models/itemGallery';
import { Product } from 'src/app/models/product';
import { ProductType } from 'src/app/models/productType';
import { ItemGalleryService } from 'src/app/services/products/item-gallery.service';
import { ProductTypeService } from 'src/app/services/products/product-type.service';
import { ProductService } from 'src/app/services/products/product.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {
  productForm: FormGroup;
  productTypes: ProductType[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { product: Product },
    private productTypeService: ProductTypeService,
    private productService: ProductService,
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<EditProductComponent>,
  ) {
    this.productForm = this.formBuilder.group({
      productType: [null, Validators.required],
      name: ['', Validators.required],
      description: [''],
      price: [0, Validators.required],
      mainImage: [null, Validators.required],
      backgroundImage: [null],
      stock: [0, Validators.required],
      gallery: this.formBuilder.array([]),
      varieties: this.formBuilder.array([]),
      tags: this.formBuilder.array([]),
    });
  }

  ngOnInit() {
    this.productTypeService.getProductTypes().subscribe(
      (prodTypes: ProductType[]) => {
        this.productTypes = prodTypes;
      },
      (error) => {
        console.error('Error fetching product types:', error);
      }
    );

    this.populateFormWithData();

  }

  constructImageUrl(imagePath: string): string {
    return `${environment.serverBaseUrl}${imagePath}`;
  }

  populateFormWithData() {
    const { product } = this.data;

    this.productForm.patchValue({
      productType: product.typeId,
      name: product.name,
      description: product.description,
      price: product.price,
      mainImage: product.mainImage,
      backgroundImage: product.background,
      stock: product.stock,
      // Additional properties can be added as needed
    });
  }

  onGalleryImagesSelected(event: any) {
    // Implement gallery image selection logic
  }

  onMainImageSelected(event: any) {
    // Implement main image selection logic
  }

  onBackgroundImageSelected(event: any) {
    // Implement background image selection logic
  }

  clearMainImage() {
    // Implement logic to clear main image
  }

  clearBackgroundImage() {
    // Implement logic to clear background image
  }

  updateProduct() {
    const formValues = this.productForm.value;

    const updatedProduct: Product = {
      productId: this.data.product.productId, // Adjust as needed
      typeId: formValues.productType,
      name: formValues.name,
      description: formValues.description,
      price: formValues.price,
      mainImage: formValues.mainImage,
      background: formValues.backgroundImage,
      stock: formValues.stock,
      galleries: formValues.gallery,
      varieties: formValues.varieties,
      tags: formValues.tags,
      mainImageBlob: '',
      bgImageBlob: '',
      quantity: 0
    };

    console.log('Update', updatedProduct);
    // this.productService.updateProduct(updatedProduct).subscribe(
    //   (response: Product) => {
    //     console.log('Product updated:', response);
    //     this.closeDialog();
    //   },
    //   (error) => {
    //     console.error('Error updating product:', error);
    //   }
    // );
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
