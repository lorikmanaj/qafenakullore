import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProductType } from 'src/app/models/productType';

import {
  faUserAstronaut,
  faCartShopping,
  faMagnifyingGlass
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  faUser = faUserAstronaut;
  faCart = faCartShopping;
  faGlass = faMagnifyingGlass;

  productTypes: ProductType[] = [
    { typeId: 1, type: 'Qafore' },
    { typeId: 2, type: 'Unaza' },
    { typeId: 3, type: 'Byzylyk' },
    { typeId: 4, type: 'Qafore' },
    { typeId: 5, type: 'Sete' }
  ];


  constructor(private router: Router) { }

  ngOnInit() { }

  selectProductType(prodTypeId: number) {
    this.router.navigate(['/prod-presenter', prodTypeId]);
  }
}
