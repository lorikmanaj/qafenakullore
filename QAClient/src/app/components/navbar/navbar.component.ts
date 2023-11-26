import { Component, OnInit } from '@angular/core';
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
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  faUser = faUserAstronaut;
  faCart = faCartShopping;
  faGlass = faMagnifyingGlass;
  faHeart = faHeart;
  faBars = faBars;
  faAdmin = faGamepad;

  isAdmin = false;

  productTypes: ProductType[] = [];

  @Output() selectProductType: EventEmitter<string> = new EventEmitter<string>();

  constructor(private productTypeService: ProductTypeService,
    private userService: UserService,
    private router: Router) { }

  ngOnInit() {
    this.productTypeService.getProductTypes().subscribe((prodTypes) => {
      this.productTypes = prodTypes;
    });

    this.handleAuthenticationState();
  }

  private handleAuthenticationState() {
    this.userService.isAuthenticated$.subscribe((isAuthenticated) => {
      //Check why isAuth: false allows isAdmin: true
      //console.log('Auth:', isAuthenticated, 'Rol:', this.userService.hasRole('Administrator'))
      this.isAdmin = isAuthenticated && this.userService.hasRole('Administrator');
    });
  }

  onSelectProductType(type: string) {
    if (type === 'Home') {
      this.router.navigate(['/home']);
    } else {
      this.router.navigate(['/products', type]);
    }
  }

  isAdministrator(): boolean {
    return this.userService.hasRole('Administrator');
  }

  navigateToAdmin() {
    this.router.navigate(['/admin']);
  }
}
