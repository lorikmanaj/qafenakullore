import { Component } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ProductType } from 'src/app/models/productType';
import { ProductService } from 'src/app/services/product.service';

import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-prod-presenter',
  templateUrl: './prod-presenter.component.html',
  styleUrls: ['./prod-presenter.component.css']
})
export class ProdPresenterComponent {
  productTypes: ProductType[] = [
    { typeId: 1, type: 'Qafore' },
    { typeId: 2, type: 'Unaza' },
    { typeId: 3, type: 'Byzylyk' },
    { typeId: 4, type: 'Qafore' },
    { typeId: 5, type: 'Sete' }
  ];

  products: Product[] = [];

  selectedProductType: ProductType | null = null;

  constructor(private productService: ProductService,
    private route: ActivatedRoute) {
    this.route.params.subscribe((params) => {
      const productId = params['id'];
    });
  }

  ngOnInit() {
    if (this.productTypes.length > 0) {
      this.selectProductType(this.productTypes[0]);
    }
  }

  selectProductType(productType: ProductType) {
    this.selectedProductType = productType;
    this.getProducts(productType.typeId);
  }

  getProducts(typeId: number) {
    this.productService.getProductsByType(typeId).subscribe((data) => {
      this.products = data;
    });
  }
}
