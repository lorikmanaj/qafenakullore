import { Component, Input } from '@angular/core';
import { Product } from 'src/app/models/product';
import { faProductHunt } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-product-grid',
  templateUrl: './product-grid.component.html',
  styleUrls: ['./product-grid.component.css']
})
export class ProductGridComponent {
  faProduct = faProductHunt;
  @Input() products: Product[] = [
    {
      id: 1,
      name: 'Product 1',
      description: 'Description for Product 1',
      price: 19.99,
      image: 'assets/item.webp',
      bg: '',
      quantity: 1
    },
    {
      id: 2,
      name: 'Product 2',
      description: 'Description for Product 2',
      price: 24.99,
      image: 'assets/item.webp',
      bg: '',
      quantity: 1
    },
    {
      id: 3,
      name: 'Product 3',
      description: 'Description for Product 3',
      price: 29.99,
      image: 'assets/item.webp',
      bg: '',
      quantity: 1
    },
    {
      id: 4,
      name: 'Product 4',
      description: 'Description for Product 4',
      price: 34.99,
      image: 'assets/item.webp',
      bg: '',
      quantity: 1
    }
  ];
}
