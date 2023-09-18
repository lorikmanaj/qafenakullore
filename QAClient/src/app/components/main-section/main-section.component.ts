import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-main-section',
  templateUrl: './main-section.component.html',
  styleUrls: ['./main-section.component.css'],
})
export class MainSectionComponent implements OnInit {
  headlineProduct!: Product;
  carouselOptions = {
    loop: true,
    items: 3, // Display 3 items at a time (adjust as needed)
    margin: 10,
    nav: true,
  };

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    // Fetch the headline product from ProductService
    this.productService.getHeadlineProduct().subscribe((product) => {
      this.headlineProduct = product;
    });
  }
}
