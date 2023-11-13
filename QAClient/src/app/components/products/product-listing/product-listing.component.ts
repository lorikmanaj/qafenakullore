import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/products/product.service';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-product-listing',
  templateUrl: './product-listing.component.html',
  styleUrls: ['./product-listing.component.css']
})
export class ProductListingComponent implements OnInit {
  products: Product[] = [];
  items: any;

  constructor(private productService: ProductService) { }

  ngOnInit() {
    //CHANGE TO TYPEID NOT TYPE
    this.route.params.subscribe(params => {
      this.productType = params['type'];
      // Now you can use this.productType in your logic
    });

    this.productService.getProductsByType().subscribe((products) => {
      this.products = products;
    });
    // this.productService.getProducts().subscribe((products) => {
    //   this.products = products;
    //   console.log(this.products);
    // });
  }
}
