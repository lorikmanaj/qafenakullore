import { Component, OnInit, ViewChild, ElementRef, QueryList, ViewChildren } from '@angular/core';
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
  selectedProductType: number | null = null;

  productForm: FormGroup;

  mainImage: File | null = null;
  backgroundImage: File | null = null;

  productVarieties: Variety[] = [];

  selectedGalleryImages: string[] = [];
  varietyImageInputs: ElementRef[] = [];

  @ViewChild('galleryImagesInput', { static: false }) galleryImagesInput!: ElementRef;

  @ViewChildren('varietyImageInput') varietyImageInput!: QueryList<ElementRef>;

  constructor(
    private productTypeService: ProductTypeService,
    private formBuilder: FormBuilder
  ) {
    this.productForm = this.formBuilder.group({
      productType: [null, Validators.required],
      name: ['', Validators.required],
      description: [''],
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

  onMainImageSelected(event: any) {
    const files = event.target.files as FileList;
    if (files.length > 0) {
      this.mainImage = files[0];
    }
  }

  onBackgroundImageSelected(event: any) {
    const files = event.target.files as FileList;
    if (files.length > 0) {
      this.backgroundImage = files[0];
    }
  }

  onGalleryImagesSelected(event: any) {
    const files = event.target.files as FileList;
    // Convert the selected files to URLs
    const urls = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      // Create a URL for each selected image
      if (file) {
        const imageUrl = URL.createObjectURL(file);
        urls.push(imageUrl);
      }
    }
    this.selectedGalleryImages = urls;
  }

  openVarietyEditor() {
    // Implement logic to open the variety editor
  }

  async addVariety() {
    // Create a new variety and push it to the array
    const newVariety: Variety = {
      description: '',
      file: null,
      imageUrl: null,
    };
    this.productVarieties.push(newVariety);
  
    // Reset the input element to allow selecting an image for the new variety
    const inputIndex = this.productVarieties.length - 1; // The index of the last added variety
    const inputElement = this.varietyImageInputs.find((el, index) => index === inputIndex);
    if (inputElement) {
      inputElement.nativeElement.value = '';
    }
  }

  editVariety(variety: Variety) {
    // Implement logic to edit the variety
  }

  deleteVariety(variety: Variety) {
    const index = this.productVarieties.indexOf(variety);
    if (index > -1) {
      this.productVarieties.splice(index, 1); // Remove the variety from the array
    }
  }

  onVarietyImageSelected(event: any, index: number) {
    const files = event.target.files as FileList;
    if (files.length > 0) {
      // Assuming that the variety at the specified index exists
      if (this.productVarieties[index]) {
        this.productVarieties[index].file = files[0];
      }
    }
  }


  createProduct() {
    if (this.productForm.valid) {
      const formValues = this.productForm.value;
      const stockQuantity = formValues.stock;
      const galleryImages = this.selectedGalleryImages; // Use the selected gallery images
      console.log(formValues);
      // Implement the logic to create a product here
    }
  }
}
