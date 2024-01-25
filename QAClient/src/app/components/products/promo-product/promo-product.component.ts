import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from 'src/app/services/products/product.service';
import { Product } from 'src/app/models/product';
import { catchError } from 'rxjs/operators';
import { SliderItem } from 'src/app/models/sliderItem';
import { Slider } from 'src/app/models/slider';
import { SlidersService } from './../../../services/sliders.service';
import { ChangeDetectorRef } from '@angular/core';
import { interval, Subscription } from 'rxjs';

import { environment } from 'src/app/environments/environment';

@Component({
  selector: 'app-promo-product',
  templateUrl: './promo-product.component.html',
  styleUrls: ['./promo-product.component.css'],
})
export class PromoProductComponent implements OnInit, OnDestroy {
  carouselProducts: Product[] = [];
  slider: Slider | undefined;
  sliderItems: SliderItem[] = [];

  currentIndex: number = 0;

  autoplayInterval: Subscription | undefined; //  store the autoplay interval subscription

  constructor(
    private productService: ProductService,
    private slidersService: SlidersService,
    private cdr: ChangeDetectorRef // there handle change detection
  ) {}

  ngOnInit(): void {
    this.slidersService.getActiveSlider().subscribe(
      (activeSlider: Slider) => {
        this.slider = activeSlider;
        this.sliderItems = activeSlider.sliderItems || [];
        this.carouselProducts = this.sliderItems
          .filter((sliderItem) => sliderItem && sliderItem.product)
          .map((sliderItem) => sliderItem.product!);

        this.startAutoplay(); // Start autoplay when the slider is loaded
      },
      (error) => {
        console.error('Error fetching active slider:', error);
      }
    );
  }

  ngOnDestroy(): void {
    this.stopAutoplay(); // Stop autoplay when the component is destroyed
  }

  constructImageUrl(imagePath: string): string {
    const imageUrl = `${environment.serverBaseUrl}${imagePath}`;
    return imageUrl;
  }

  nextSlide() {
    this.currentIndex = (this.currentIndex + 1) % this.carouselProducts.length;
  }

  prevSlide() {
    this.currentIndex =
      (this.currentIndex - 1 + this.carouselProducts.length) %
      this.carouselProducts.length;
  }

  startAutoplay() {
    // Start autoplay with a 2-second interval
    this.autoplayInterval = interval(2000).subscribe(() => {
      this.nextSlide();
      this.cdr.detectChanges(); // Manually trigger change detection
    });
  }

  stopAutoplay() {
    // Stop autoplay when the component is destroyed
    if (this.autoplayInterval) {
      this.autoplayInterval.unsubscribe();
    }
  }
}
