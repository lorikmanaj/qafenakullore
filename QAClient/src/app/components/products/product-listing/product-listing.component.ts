import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/products/product.service';
import { Product } from 'src/app/models/product';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-listing',
  templateUrl: './product-listing.component.html',
  styleUrls: ['./product-listing.component.css']
})
export class ProductListingComponent implements OnInit {
  products: Product[] = [];
  items: any;
  productType: string = '';

  constructor(private productService: ProductService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.productType = params['type'];
      this.productService.getProductsByType(this.productType).subscribe((products) => {
        console.log('Prodsat', products);
        this.products = products;
      });
    });
  }

  // ngOnInit() {
  //   console.log('ProductListingComponent ngOnInit');
  //   this.route.params.subscribe(params => {
  //     this.productType = params['type'];
  //     // Now you can use this.productType in your logic
  //   });

  //   this.productService.getProductsByType(this.productType).subscribe((products) => {
  //     console.log('Prodsat', products);
  //     this.products = products;
  //   });
  //   // this.productService.getProducts().subscribe((products) => {
  //   //   this.products = products;
  //   //   console.log(this.products);
  //   // });
  // }
}
