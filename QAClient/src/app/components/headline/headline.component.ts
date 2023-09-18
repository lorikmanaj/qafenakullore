import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-headline',
  templateUrl: './headline.component.html',
  styleUrls: ['./headline.component.css']
})
export class HeadlineComponent {
  @Input() headlineProduct!: Product;

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.productService.getHeadlineProduct().subscribe((product) => {
      this.headlineProduct = product;
    });
  }
}
