import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ProductTypeService } from './../../services/product-type.service';
import { ProductType } from 'src/app/models/productType';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Variety } from 'src/app/models/variety';

@Component({
  selector: 'app-prod-create',
  templateUrl: './prod-create.component.html',
  styleUrls: ['./prod-create.component.css']
})
export class ProdCreateComponent implements OnInit {
  productTypes: ProductType[] = [];
  varieties: Variety[] = [];

  productForm: FormGroup;
  mainImage: string | null = null;
  backgroundImage: string | null = null;
  selectedGalleryImages: string[] = [];

  @ViewChild('galleryImagesInput', { static: false }) galleryImagesInput!: ElementRef;

  constructor(
    private productTypeService: ProductTypeService,
    private formBuilder: FormBuilder
  ) {
    this.productForm = this.formBuilder.group({
      productType: [null, Validators.required],
      name: ['', Validators.required],
      price: [0, Validators.required],
      mainImage: [null, Validators.required],
      backgroundImage: [null],
      stock: [0, Validators.required],
      gallery: [],
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
  }

  onGalleryImagesSelected(event: any) {
    const files = event.target.files as FileList;
    this.selectedGalleryImages = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (file) {
        const imageUrl = URL.createObjectURL(file);
        this.selectedGalleryImages.push(imageUrl);
      }
    }
  }

  onMainImageSelected(event: any) {
    const files = event.target.files as FileList;
    if (files.length > 0) {
      this.mainImage = URL.createObjectURL(files[0]);
    }
  }

  onBackgroundImageSelected(event: any) {
    const files = event.target.files as FileList;
    if (files.length > 0) {
      this.backgroundImage = URL.createObjectURL(files[0]);
    }
  }

  clearMainImage() {
    this.mainImage = null;
  }

  clearBackgroundImage() {
    this.backgroundImage = null;
  }

  createProduct() {
    if (this.productForm.valid) {
      // const formValues = this.productForm.value;
      // const stockQuantity = formValues.stock;
      // const galleryImages = this.selectedGalleryImages;
      // console.log(formValues);
      const formValues = this.productForm.value;
      
      const product = {
        productType: formValues.productType,
        name: formValues.name,
        price: formValues.price,
        mainImage: this.mainImage,
        backgroundImage: this.backgroundImage,
        stock: formValues.stock,
        gallery: this.selectedGalleryImages,
        varieties: this.varieties, // Include the array of varieties
      };

      console.log('Product:', product);
    }
  }
}
