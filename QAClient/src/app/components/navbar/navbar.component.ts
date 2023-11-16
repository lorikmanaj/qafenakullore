import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProductType } from 'src/app/models/productType';
import { EventEmitter, Output } from '@angular/core';

import {
  faUserAstronaut,
  faCartShopping,
  faMagnifyingGlass,
  faHeart,
  faBars,
  faGamepad
} from '@fortawesome/free-solid-svg-icons';
import { ProductTypeService } from 'src/app/services/products/product-type.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  faUser = faUserAstronaut;
  faCart = faCartShopping;
  faGlass = faMagnifyingGlass;
  faHeart = faHeart;
  faBars = faBars;
  faAdmin = faGamepad;

  productTypes: ProductType[] = [];

  @Output() selectProductType: EventEmitter<string> = new EventEmitter<string>();

  constructor(private productTypeService: ProductTypeService,
    private router: Router) { }

  ngOnInit() {
    this.productTypeService.getProductTypes().subscribe((prodTypes) => {
      this.productTypes = prodTypes;
      console.log(this.productTypes);
    });
  }

  // onSelectProductType(type: string) {
  //   // if (type === 'Home') {
  //   //   this.router.navigate(['/products', type]);
  //   // }
  //   // this.router.navigate(['/products', type]);
  //   this.selectProductType.emit(type);
  // }
  onSelectProductType(type: string) {
    console.log(`onSelectProductType called with type: ${type}`);
    if (type === 'Home') {
      console.log('Navigating to /home');
      this.router.navigate(['/home']);
    } else {
      console.log(`Navigating to /products/${type}`);
      this.router.navigate(['/products', type]);
    }
  }

  navigateToAdmin() {
    this.router.navigate(['/admin']);
  }
}
