import { Variety } from 'src/app/models/variety';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ProductTypeService } from './../../services/product-type.service';
import { ProductType } from 'src/app/models/productType';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TagSelectionService } from 'src/app/services/tag-selection.service';

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
    private tagSelectionService: TagSelectionService,
    private formBuilder: FormBuilder
  ) {
    this.productForm = this.formBuilder.group({
      productType: [null, Validators.required],
      name: ['', Validators.required],
      price: [0, Validators.required],
      mainImage: [null, Validators.required],
      backgroundImage: [null],
      stock: [0, Validators.required],
      gallery: this.formBuilder.array([]),
      varieties: this.formBuilder.array([]),
      tags: []
    });
  }
  // Replace the service call with mock data for testing
  // this.productTypes = [
  //   { typeId: 1, type: 'Type 1' },
  //   { typeId: 2, type: 'Type 2' },
    // Add more data as needed
  // ];
// }

  ngOnInit() {
    this.productTypeService.getProductTypes().subscribe(
      (prodTypes: ProductType[]) => {
        this.productTypes = prodTypes;
        console.log('Product Types:', this.productTypes);
      },
      (error) => {
        console.error('Error fetching product types:', error);
      }
    );
  }

//add varieties to the form
  addVariety() {
    const varietyControl = this.formBuilder.group({
      description: ['', Validators.required],
      imageUrl: [null],
    });

    (this.productForm.get('varieties') as FormArray).push(varietyControl);
  }

  // submitVariety function to update the FormArray
  submitVariety(index: number) {
    const varietyControl = (this.productForm.get('varieties') as FormArray).at(index);
    this.varieties.push(varietyControl.value);
    (this.productForm.get('varieties') as FormArray).removeAt(index);
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
    const formValues = this.productForm.value;
    const product = {
      productType: formValues.productType,
      name: formValues.name,
      price: formValues.price,
      mainImage: this.mainImage,
      backgroundImage: this.backgroundImage,
      stock: formValues.stock,
      gallery: this.selectedGalleryImages,
      varieties: formValues.varieties,
      tags: this.tagSelectionService.getSelectedTags(), // Get selected tags
    };
    console.log('Product:', product);
    if (this.productForm.valid) {
      // You can now use the "product" object for further processing
    }
  }

}
