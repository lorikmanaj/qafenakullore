import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { TokenInterceptor } from './auth/token.interceptor';

import { FormsModule } from '@angular/forms';
import { LoginComponent } from './auth/login/login.component';
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

import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';

import { AppComponent } from './app.component';
import { AdminOrdersComponent } from './components/admin/admin-orders/admin-orders.component';
import { AdminPanelComponent } from './components/admin/admin-panel/admin-panel.component';
import { AlertComponent } from './components/alert/alert.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { ProdCategoriesComponent } from './components/products/prod-categories/prod-categories.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeadlineComponent } from './components/headline/headline.component';
import { MainSectionComponent } from './components/main-section/main-section.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { NavmenuComponent } from './components/navmenu/navmenu.component';
import { ProductComponent } from './components/products/product/product.component';
import { ProductFiltersComponent } from './components/products/product-filters/product-filters.component';
import { ProductListingComponent } from './components/products/product-listing/product-listing.component';
import { PromoProductComponent } from './components/products/promo-product/promo-product.component';
import { SearchComponent } from './components/search/search.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { SubscribeComponent } from './components/subscribe/subscribe.component';
import { TestimonialsComponent } from './components/testimonials/testimonials.component';
import { UserOrdersComponent } from './components/user/user-orders/user-orders.component';
import { UserProfileComponent } from './components/user/user-profile/user-profile.component';
import { StarRatingComponent } from './components/products/star-rating/star-rating.component';
import { CartComponent } from './components/products/cart/cart.component';

import { ProductGridComponent } from './components/products/product-grid/product-grid.component';

import { ProductService } from './services/products/product.service';
import { CartService } from './services/products/cart.service';

import { ProfileOptionsComponent } from './components/profile-options/profile-options.component';
import { HomeComponent } from './components/home/home.component';
import { ProductCardComponent } from './components/products/product-card/product-card.component';
import { ProductDetailsComponent } from './components/products/product-details/product-details.component';
import { CollectionSectionComponent } from './components/collection-section/collection-section.component';

import { AuthGuard } from './auth/guards/auth-guard.service';

import { ProductHandlerComponent } from './components/products/product-handler/product-handler.component';
import { OrderHandlerComponent } from './components/order-handler/order-handler.component';
import { ProdGalleryEditorComponent } from './components/products/prod-gallery-editor/prod-gallery-editor.component';
import { ProdReviewEditorComponent } from './components/products/prod-review-editor/prod-review-editor.component';
import { ProdCreateComponent } from './components/products/prod-create/prod-create.component';
import { GalleryUploaderComponent } from './components/products/gallery-uploader/gallery-uploader.component';
import { VarietyComponent } from './components/products/variety/variety.component';
import { TagHelperComponent } from './components/tag-helper/tag-helper.component';
import { EditProductComponent } from './components/products/edit-product/edit-product.component';
import { WishlistComponent } from './components/products/wishlist/wishlist.component';
import { WishlistService } from './services/products/wishlist.service';

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
    ProdReviewEditorComponent,
    ProdCreateComponent,
    GalleryUploaderComponent,
    VarietyComponent,
    TagHelperComponent,
    EditProductComponent,
    WishlistComponent,
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
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    ToastrModule.forRoot(),//{ positionClass: 'inline' }
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: [],
        disallowedRoutes: []
      }
    }),
  ],
  providers: [
    ProductService,

    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },

    CartService,
    WishlistService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

}