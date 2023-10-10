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
  faHeart = faHeart;
  faBars = faBars;


  productTypes: ProductType[] = [
    { typeId: 1, type: 'Home' },
    { typeId: 2, type: 'Qafore' },
    { typeId: 3, type: 'Unaza' },
    { typeId: 4, type: 'Byzylyk' },
    { typeId: 5, type: 'Qafore' },
    { typeId: 6, type: 'Sete' }
  ];

  @Output() selectProductType: EventEmitter<string> = new EventEmitter<string>();

  constructor(private router: Router) { }

  ngOnInit() { }

  onSelectProductType(type: string) {
    // if (type === 'Home') {
    //   this.router.navigate(['/products', type]);
    // }
    // this.router.navigate(['/products', type]);
    this.selectProductType.emit(type);
  }
}
