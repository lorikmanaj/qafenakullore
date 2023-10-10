import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CarouselModule } from '@coreui/angular';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { TokenInterceptor } from './helpers/token.interceptor';

import { AppComponent } from './app.component';
import { AdminOrdersComponent } from './components/admin-orders/admin-orders.component';
import { AdminPanelComponent } from './components/admin-panel/admin-panel.component';
import { AlertComponent } from './components/alert/alert.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { ProdCategoriesComponent } from './components/prod-categories/prod-categories.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeadlineComponent } from './components/headline/headline.component';
import { LoginComponent } from './components/login/login.component';
import { MainSectionComponent } from './components/main-section/main-section.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { NavmenuComponent } from './components/navmenu/navmenu.component';
import { ProductComponent } from './components/product/product.component';
import { ProductFiltersComponent } from './components/product-filters/product-filters.component';
import { ProductListingComponent } from './components/product-listing/product-listing.component';
import { PromoProductComponent } from './components/promo-product/promo-product.component';
import { RegisterComponent } from './components/register/register.component';
import { SearchComponent } from './components/search/search.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { SubscribeComponent } from './components/subscribe/subscribe.component';
import { TestimonialsComponent } from './components/testimonials/testimonials.component';
import { UserOrdersComponent } from './components/user-orders/user-orders.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { StarRatingComponent } from './components/star-rating/star-rating.component';
import { CartComponent } from './components/cart/cart.component';
import { ProductGridComponent } from './components/product-grid/product-grid.component';
import { ProfileOptionsComponent } from './components/profile-options/profile-options.component';
import { HomeComponent } from './components/home/home.component';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';

import { ProductService } from './services/product.service';
import { CartService } from './services/cart.service';

import { CollectionSectionComponent } from './components/collection-section/collection-section.component';
@NgModule({
  declarations: [
    AppComponent,
    AdminOrdersComponent,
    AdminPanelComponent,
    AlertComponent,
    CartComponent,
    CheckoutComponent,
    ProdCategoriesComponent,
    FooterComponent,
    HeadlineComponent,
    LoginComponent,
    MainSectionComponent,
    NavbarComponent,
    NavmenuComponent,
    ProductComponent,
    ProductFiltersComponent,
    ProductListingComponent,
    PromoProductComponent,
    RegisterComponent,
    SearchComponent,
    SidebarComponent,
    SubscribeComponent,
    TestimonialsComponent,
    UserOrdersComponent,
    UserProfileComponent,
    ProductGridComponent,
    StarRatingComponent,
    ProfileOptionsComponent,
    HomeComponent,
    ProductCardComponent,
    ProductDetailsComponent,
    CollectionSectionComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    BrowserAnimationsModule,
    CarouselModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    ProductService,
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    CartService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

 }

