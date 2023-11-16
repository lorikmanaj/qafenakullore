import { inject, NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';
import { ProductListingComponent } from './components/products/product-listing/product-listing.component';
import { HomeComponent } from './components/home/home.component';
import { AuthComponent } from './auth/auth.component'

import { ProductDetailsComponent } from './components/products/product-details/product-details.component';
import { AdminPanelComponent } from './components/admin/admin-panel/admin-panel.component';
import { LoginComponent } from './components/login/login.component';


// const routes: Routes = [
//   { path: 'products/home', component: HomeComponent, },//canActivate: [AuthGuard], },
//   { path: 'products/:type', component: ProductListingComponent },
//   { path: 'product/:id', component: ProductDetailsComponent },
//   { path: 'admin', component: AdminPanelComponent },
//   { path: '', redirectTo: '/products/home', pathMatch: 'full' },
//   {
//     path: "register", component: AuthComponent,
//   },
//   {
//     path: "logins", component: LoginComponent,
//   },
//   {
//     path: "login", component: AuthComponent, data: { isLogin: true }
//   },
//   {
//     path: "register", component: AuthComponent, data: { isLogin: false }
//   },
//   { path: '**', redirectTo: '/' },
//   { path: '', redirectTo: '/products/home', pathMatch: 'full' }
// ];
const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'products/:type', component: ProductListingComponent },
  { path: 'product/:id', component: ProductDetailsComponent },
  { path: 'admin', component: AdminPanelComponent },
  { path: 'register', component: AuthComponent },
  { path: 'login', component: AuthComponent, data: { isLogin: true } },
  { path: 'register', component: AuthComponent, data: { isLogin: false } },
  { path: '**', redirectTo: '/home' },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
];


@NgModule({
  imports: [RouterModule.forRoot(routes, {
    enableTracing: false
  })],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
