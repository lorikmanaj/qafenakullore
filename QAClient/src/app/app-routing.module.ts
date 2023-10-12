import {  inject,NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules  } from '@angular/router';
import { ProductListingComponent } from './components/product-listing/product-listing.component';
import { HomeComponent } from './components/home/home.component';
import { AuthComponent } from './auth/auth.component'
import { AuthGuard } from './guards/auth-guard.service';

import { ProductDetailsComponent } from './components/product-details/product-details.component'
import { UserService } from "./services/user.service";
import { map } from "rxjs/operators";
import { LoginComponent } from './components/login/login.component';


const routes: Routes = [
  { path: 'products/home', component: HomeComponent,  },//canActivate: [AuthGuard], },
  { path: 'products/:type', component: ProductListingComponent },
  { path: 'product/:id', component: ProductDetailsComponent },
  { path: '', redirectTo: '/products/home', pathMatch: 'full' },
  {
    path: "register", component:  AuthComponent,
  },
  {
    path: "logins", component:  LoginComponent,
  },
  {
    path: "login",
    loadComponent: () =>
      import("./auth/auth.component").then((m) => m.AuthComponent),
    canActivate: [
      () => inject(UserService).isAuthenticated.pipe(map((isAuth) => !isAuth)),
    ],
  },
  {
    path: "register",
    loadComponent: () =>
      import("./auth/auth.component").then((m) => m.AuthComponent),
    canActivate: [
      () => inject(UserService).isAuthenticated.pipe(map((isAuth) => !isAuth)),
    ],
  },
  { path: '**', redirectTo: '/' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
