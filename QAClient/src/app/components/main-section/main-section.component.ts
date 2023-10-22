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
    items: 3, //Items Def
    margin: 10,
    nav: true,
  };

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.productService.getHeadlineProduct().subscribe((product) => {
      this.headlineProduct = product;
    });
  }
}
