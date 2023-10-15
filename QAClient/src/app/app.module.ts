import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ModalModule } from 'ngx-bootstrap/modal';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ReactiveFormsModule } from '@angular/forms';
import { JwtModule } from "@auth0/angular-jwt";
import { ToastrModule } from 'ngx-toastr';
import { NgxPaginationModule } from 'ngx-pagination';
import { CarouselModule } from '@coreui/angular';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AppRoutingModule } from './app-routing.module';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

import { AppComponent } from './app.component';
import { AdminOrdersComponent } from './components/admin-orders/admin-orders.component';
import { AdminPanelComponent } from './components/admin-panel/admin-panel.component';
import { AlertComponent } from './components/alert/alert.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { ProdCategoriesComponent } from './components/prod-categories/prod-categories.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeadlineComponent } from './components/headline/headline.component';
import { MainSectionComponent } from './components/main-section/main-section.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { NavmenuComponent } from './components/navmenu/navmenu.component';
import { ProductComponent } from './components/product/product.component';
import { ProductFiltersComponent } from './components/product-filters/product-filters.component';
import { ProductListingComponent } from './components/product-listing/product-listing.component';
import { PromoProductComponent } from './components/promo-product/promo-product.component';
import { SearchComponent } from './components/search/search.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { SubscribeComponent } from './components/subscribe/subscribe.component';
import { TestimonialsComponent } from './components/testimonials/testimonials.component';
import { UserOrdersComponent } from './components/user-orders/user-orders.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { StarRatingComponent } from './components/star-rating/star-rating.component';
import { CartComponent } from './components/cart/cart.component';

import { ProductGridComponent } from './components/product-grid/product-grid.component';

import { ProductService } from './services/product.service';
import { CartService } from './services/cart.service';
import { ProfileOptionsComponent } from './components/profile-options/profile-options.component';
import { HomeComponent } from './components/home/home.component';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { CollectionSectionComponent } from './components/collection-section/collection-section.component';

import { AuthGuard } from './guards/auth-guard.service';

import { ProductHandlerComponent } from './components/product-handler/product-handler.component';
import { OrderHandlerComponent } from './components/order-handler/order-handler.component';
import { ProdGalleryEditorComponent } from './components/prod-gallery-editor/prod-gallery-editor.component';
import { ProdVarietyEditorComponent } from './components/prod-variety-editor/prod-variety-editor.component';
import { ProdReviewEditorComponent } from './components/prod-review-editor/prod-review-editor.component';
import { ProdCreateComponent } from './components/prod-create/prod-create.component';
import { GalleryUploaderComponent } from './components/gallery-uploader/gallery-uploader.component';
import { AuthComponent } from './auth/auth.component';

export function tokenGetter() {
  return localStorage.getItem("jwt");
}
@NgModule({
  declarations: [
    LoginComponent,
    AppComponent,
    AdminOrdersComponent,
    AdminPanelComponent,
    AlertComponent,
    CartComponent,
    CheckoutComponent,
    ProdCategoriesComponent,
    FooterComponent,
    HeadlineComponent,
    MainSectionComponent,
    NavbarComponent,
    NavmenuComponent,
    ProductComponent,
    ProductFiltersComponent,
    ProductListingComponent,
    PromoProductComponent,
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
    ProductHandlerComponent,
    OrderHandlerComponent,
    ProdGalleryEditorComponent,
    ProdVarietyEditorComponent,
    ProdReviewEditorComponent,
    AuthComponent,
    ProdCreateComponent,
    GalleryUploaderComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    FontAwesomeModule,
    BrowserAnimationsModule,
    CarouselModule,
    HttpClientModule,
    MatDialogModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: [],
        disallowedRoutes: []
      }
    }),

    ToastrModule.forRoot()

  ],
  providers: [
    ProductService,

    // { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },

    CartService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

}

