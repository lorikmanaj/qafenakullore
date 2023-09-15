import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FormsModule } from '@angular/forms';
import { AuthenticationInterceptor } from './services/interceptor';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { MainsectionComponent } from './components/mainsection/mainsection.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { HeadlineComponent } from './components/headline/headline.component';
import { ProductComponent } from './components/product/product.component';
import { ProductListingComponent } from './components/product-listing/product-listing.component';
import { FooterComponent } from './components/footer/footer.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { AdminPanelComponent } from './components/admin-panel/admin-panel.component';
import { UserOrdersComponent } from './components/user-orders/user-orders.component';
import { AdminOrdersComponent } from './components/admin-orders/admin-orders.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ProductFiltersComponent } from './components/product-filters/product-filters.component';
import { AlertComponent } from './components/alert/alert.component';
import { SearchComponent } from './components/search/search.component';
import { TestimonialsComponent } from './components/testimonials/testimonials.component';
import { SubscribeComponent } from './components/subscribe/subscribe.component';
import { NavmenuComponent } from './components/navmenu/navmenu.component';
import { PromoProductComponent } from './components/promo-product/promo-product.component';
import { CartComponent } from './components/cart/cart.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SidebarComponent,
    MainsectionComponent,
    CategoriesComponent,
    HeadlineComponent,
    ProductComponent,
    ProductListingComponent,
    FooterComponent,
    UserProfileComponent,
    AdminPanelComponent,
    UserOrdersComponent,
    AdminOrdersComponent,
    LoginComponent,
    RegisterComponent,
    ProductFiltersComponent,
    AlertComponent,
    SearchComponent,
    TestimonialsComponent,
    SubscribeComponent,
    NavmenuComponent,
    PromoProductComponent,
    CartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthenticationInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
