import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';
import { ProductListingComponent } from './components/products/product-listing/product-listing.component';
import { HomeComponent } from './components/home/home.component';

import { ProductDetailsComponent } from './components/products/product-details/product-details.component';
import { AdminPanelComponent } from './components/admin/admin-panel/admin-panel.component';
import { LoginComponent } from './auth/login/login.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { BillingDetailsComponent } from './components/billing-details/billing-details.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'products/:type', component: ProductListingComponent },
  { path: 'product/:id', component: ProductDetailsComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'billing', component: BillingDetailsComponent },
  { path: 'admin', component: AdminPanelComponent },
  { path: 'login', component: LoginComponent },
  //Ignore the register for now focus on Login
  //Login is supposed to take us home after its been success.
  //{ path: 'register', component: AuthComponent, data: { isLogin: false } },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/home' }
];
@NgModule({
  imports: [RouterModule.forRoot(routes, {
    enableTracing: false
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
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