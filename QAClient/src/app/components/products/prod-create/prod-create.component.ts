import { Variety } from 'src/app/models/variety';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ProductTypeService } from '../../../services/products/product-type.service';
import { ProductType } from 'src/app/models/productType';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TagSelectionService } from 'src/app/services/tag-selection.service';
import { VarietySelectionService } from 'src/app/services/variety-selection.service';
import { ProductService } from 'src/app/services/products/product.service';

@Component({
  selector: 'app-prod-create',
  templateUrl: './prod-create.component.html',
  styleUrls: ['./prod-create.component.css']
})
export class ProdCreateComponent implements OnInit {
  productTypes: ProductType[] = [];

  productForm: FormGroup;
  mainImage: string | null = null;
  backgroundImage: string | null = null;
  selectedGalleryImages: string[] = [];

  @ViewChild('galleryImagesInput', { static: false }) galleryImagesInput!: ElementRef;

  constructor(
    private productTypeService: ProductTypeService,
    private productService: ProductService,
    private tagSelectionService: TagSelectionService,
    private varietySelectionService: VarietySelectionService,
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
      gallery: this.formBuilder.array([]),
      varieties: this.formBuilder.array([]),
      tags: this.formBuilder.array([])
    });
  }

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

  async convertImageToBase64(imageUrl: string): Promise<string> {
    const response = await fetch(imageUrl);
    const blob = await response.blob();
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  }

  createProduct1() {
    const formValues = this.productForm.value;

    const product = {
      productType: formValues.productType,
      name: formValues.name,
      description: formValues.description,
      price: formValues.price,
      mainImage: this.mainImage,
      backgroundImage: this.backgroundImage,
      stock: formValues.stock,
      gallery: this.selectedGalleryImages,
      tags: this.tagSelectionService.getSelectedTags(),
      varieties: this.varietySelectionService.getVarieties(),
      //HERE
      galleryBase64: [],
      varietyBase64: [],
    };

    this.productService.createProduct(product).subscribe(
      (response) => {
        console.log('Product created:', response);
      },
      (error) => {
        console.error('Error creating product:', error);
      }
    );

    // if (this.productForm.valid) {

    //   console.log('Product:', product);
    //   // You can now use the "product" object for further processing
    // }
  }

  async createProduct() {
    const formValues = this.productForm.value;

    const product = {
      productType: formValues.productType,
      name: formValues.name,
      description: formValues.description,
      price: formValues.price,
      mainImage: this.mainImage,
      backgroundImage: this.backgroundImage,
      stock: formValues.stock,
      gallery: this.selectedGalleryImages,
      tags: this.tagSelectionService.getSelectedTags(),
      varieties: this.varietySelectionService.getVarieties(),
      mainImg64: '',
      bgImg64: '', // Initialize, this will be assigned later
      galleryBase64: [''], // Initialize, this will be assigned later
      varietyBase64: [''], // Initialize, this will be assigned later
    };

    // Function to convert an image URL to Base64
    const convertImageToBase64 = async (imageUrl: string) => {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const reader = new FileReader();
      return new Promise<string>((resolve) => {
        reader.onloadend = () => resolve(reader.result as string);
        reader.readAsDataURL(blob);
      });
    };

    // Convert mainImage to Base64
    if (product.mainImage) {
      product.mainImg64 = await convertImageToBase64(product.mainImage);
    }

    // Convert backgroundImage to Base64
    if (product.backgroundImage) {
      product.bgImg64 = await convertImageToBase64(product.backgroundImage);
    }

    // Convert gallery images to Base64 using map
    product.galleryBase64 = await Promise.all(
      product.gallery.map(async (imageUrl) => await convertImageToBase64(imageUrl))
    ) as string[];

    // Convert variety images to Base64 using map
    product.varietyBase64 = await Promise.all(
      product.varieties.map(async (variety) => await convertImageToBase64(variety.imageUrl))
    ) as string[];

    console.log(product);
    //Send the product to your API
    // this.productService.createProduct(product).subscribe(
    //   (response) => {
    //     console.log('Product created:', response);
    //   },
    //   (error) => {
    //     console.error('Error creating product:', error);
    //   }
    // );
  }

}