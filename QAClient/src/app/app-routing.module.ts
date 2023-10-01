import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListingComponent } from './components/product-listing/product-listing.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  { path: 'products/home', component: HomeComponent },
  { path: 'products/:type', component: ProductListingComponent },
  { path: '', redirectTo: '/products/home', pathMatch: 'full' }, // Default route
  { path: '**', redirectTo: '/' }, // Handle invalid routes
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
