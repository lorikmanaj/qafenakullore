import { Component, Input, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/products/product.service';
import { Product } from 'src/app/models/product';
import { catchError } from 'rxjs/operators';
import { SliderItem } from 'src/app/models/sliderItem';
import { Slider } from 'src/app/models/slider';
import { SlidersService } from './../../../services/sliders.service';
import { environment } from 'src/app/environments/environment';

@Component({
  selector: 'app-promo-product',
  templateUrl: './promo-product.component.html',
  styleUrls: ['./promo-product.component.css']
})
export class PromoProductComponent implements OnInit {
  //C'komento qeto e sheh qysh del ne UI
  // carouselProducts: Product[] = [
  //   {
  //     productId: 1,
  //     typeId: 1,
  //     name: 'Product 1',
  //     description: 'Description for Product 1',
  //     price: 19.99,
  //     mainImage: 'https://example.com/product1.jpg',
  //     mainImageBlob: '',
  //     background: 'https://mdbcdn.b-cdn.net/img/Photos/Slides/img%20(22).webp',
  //     bgImageBlob: '',
  //     stock: 0,
  //     quantity: 1,
  //     varieties: [],
  //     tags: [],
  //     galleries: [],
  //     productReviews: [],
  //     itemGalleries: []
  //   },
  //   {
  //     productId: 2,
  //     typeId: 2,
  //     name: 'Product 2',
  //     description: 'Description for Product 2',
  //     price: 24.99,
  //     mainImage: 'https://example.com/product2.jpg',
  //     mainImageBlob: '',
  //     background: 'https://mdbcdn.b-cdn.net/img/Photos/Slides/img%20(22).webp',
  //     bgImageBlob: '',
  //     stock: 0,
  //     quantity: 1,
  //     varieties: [],
  //     tags: [],
  //     galleries: [],
  //     productReviews: [],
  //     itemGalleries: []
  //   },
  //   {
  //     productId: 3,
  //     typeId: 3,
  //     name: 'Product 3',
  //     description: 'Description for Product 3',
  //     price: 29.99,
  //     mainImage: 'https://example.com/product3.jpg',
  //     mainImageBlob: '',
  //     background: 'https://mdbcdn.b-cdn.net/img/Photos/Slides/img%20(22).webp',
  //     bgImageBlob: '',
  //     stock: 0,
  //     quantity: 1,
  //     varieties: [],
  //     tags: [],
  //     galleries: [],
  //     productReviews: [],
  //     itemGalleries: []
  //   },
  //   {
  //     productId: 4,
  //     typeId: 4,
  //     name: 'Product 4',
  //     description: 'Description for Product 4',
  //     price: 34.99,
  //     mainImage: 'https://example.com/product4.jpg',
  //     mainImageBlob: '',
  //     background: 'https://mdbcdn.b-cdn.net/img/Photos/Slides/img%20(22).webp',
  //     bgImageBlob: '',
  //     stock: 0,
  //     quantity: 1,
  //     varieties: [],
  //     tags: [],
  //     galleries: [],
  //     productReviews: [],
  //     itemGalleries: []
  //   },
  //   {
  //     productId: 5,
  //     typeId: 1,
  //     name: 'Product 5',
  //     description: 'Description for Product 4',
  //     price: 34.99,
  //     mainImage: 'https://example.com/product4.jpg',
  //     mainImageBlob: '',
  //     background: 'https://mdbcdn.b-cdn.net/img/Photos/Slides/img%20(22).webp',
  //     bgImageBlob: '',
  //     stock: 0,
  //     quantity: 1,
  //     varieties: [],
  //     tags: [],
  //     galleries: [],
  //     productReviews: [],
  //     itemGalleries: []
  //   },
  //   {
  //     productId: 6,
  //     typeId: 2,
  //     name: 'Product 6',
  //     description: 'Description for Product 4',
  //     price: 34.99,
  //     mainImage: 'https://example.com/product4.jpg',
  //     mainImageBlob: '',
  //     background: 'https://mdbcdn.b-cdn.net/img/Photos/Slides/img%20(22).webp',
  //     bgImageBlob: '',
  //     stock: 0,
  //     quantity: 1,
  //     varieties: [],
  //     tags: [],
  //     galleries: [],
  //     productReviews: [],
  //     itemGalleries: []
  //   }
  // ];

  //Tash me mujt me mrri mi shfaq njejti sen veq
  //data source osht qeky slider
  //slider ka property sliderItems[]
  //secili sliderItem ka produkt mrena
  //Dmth e ki qet array tproduktev mrena
  //ose prej htmml me shku direkt foreach sliderItem in slider.sliderItems
  //sliderItem.product property
  carouselProducts: Product[] = [];
  slider: Slider | undefined;
  sliderItems: SliderItem[] = [];

  currentIndex: number = 0;

  constructor(private productService: ProductService,
    private slidersService: SlidersService) { }

  ngOnInit(): void {
    this.slidersService.getActiveSlider()
      .subscribe(
        (activeSlider: Slider) => {
          console.log(activeSlider); // This should work now
          this.slider = activeSlider;
          this.sliderItems = activeSlider.sliderItems || [];
          console.log('Aktiv', this.sliderItems);
          this.carouselProducts = this.sliderItems
            .filter(sliderItem => sliderItem && sliderItem.product)
            .map(sliderItem => sliderItem.product!);

          console.log('allo', this.carouselProducts); // Move it here
        },
        (error) => {
          console.error('Error fetching active slider:', error);
        }
      );
  }

  constructImageUrl(imagePath: string): string {
    return `${environment.serverBaseUrl}${imagePath}`;
  }
}
