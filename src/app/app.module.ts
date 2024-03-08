import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import {
  HttpClient,
  HttpClientModule,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDividerModule } from '@angular/material/divider';
import { FormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ReactiveFormsModule } from '@angular/forms';
import { UserListComponent } from './user/user-list/user-list.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { UserCreateComponent } from './user/user-create/user-create.component';
import { MatSelectModule } from '@angular/material/select';
import { UserUpdateComponent } from './user/user-update/user-update.component';
import { ChangePasswordComponent } from './user/change-password/change-password.component';
import { RoleCreateComponent } from './role/role-create/role-create.component';
import { RoleListComponent } from './role/role-list/role-list.component';
import { RoleUpdateComponent } from './role/role-update/role-update.component';
import { LoginComponent } from './login/login.component';
import { MatCardModule } from '@angular/material/card';
import { HomeLayoutComponent } from './layout/home-layout/home-layout.component';
import { LoginLayoutComponent } from './layout/login-layout/login-layout.component';
import { HomeComponent } from './home/home.component';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { MatMenuModule } from '@angular/material/menu';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatRadioModule } from '@angular/material/radio';
import { MatTabsModule } from '@angular/material/tabs';
import { MatListModule } from '@angular/material/list';
import { MatDialogModule } from '@angular/material/dialog';
import { MatBadgeModule } from '@angular/material/badge';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { environment } from '../environments/environment';
import { initializeApp } from 'firebase/app';

import { MatExpansionModule } from '@angular/material/expansion';

import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { BannerListComponent } from './banner/banner-list/banner-list.component';
import { BannerCreateComponent } from './banner/banner-create/banner-create.component';
import { BannerUpdateComponent } from './banner/banner-update/banner-update.component';
import { WorkListComponent } from './work/work-list/work-list.component';
import { WorkCreateComponent } from './work/work-create/work-create.component';
import { WorkUpdateComponent } from './work/work-update/work-update.component';
import { ServiceTypeListComponent } from './services/service-type/service-type-list/service-type-list.component';
import { ServiceTypeCreateComponent } from './services/service-type/service-type-create/service-type-create.component';
import { ServiceTypeUpdateComponent } from './services/service-type/service-type-update/service-type-update.component';
import { ServiceCountryListComponent } from './services/service-country/service-country-list/service-country-list.component';
import { ServiceCountryCreateComponent } from './services/service-country/service-country-create/service-country-create.component';
import { ServiceCountryUpdateComponent } from './services/service-country/service-country-update/service-country-update.component';
import { ServiceSectionListComponent } from './services/service-section/service-section-list/service-section-list.component';
import { ServiceSectionCreateComponent } from './services/service-section/service-section-create/service-section-create.component';
import { ServiceSectionUpdateComponent } from './services/service-section/service-section-update/service-section-update.component';
import { ServiceLocationListComponent } from './services/service-location/service-location-list/service-location-list.component';
import { ServiceLocationCreateComponent } from './services/service-location/service-location-create/service-location-create.component';
import { ServiceLocationUpdateComponent } from './services/service-location/service-location-update/service-location-update.component';
import { NewsActivityListComponent } from './news-activity/news-activity-list/news-activity-list.component';
import { NewsActivityCreateComponent } from './news-activity/news-activity-create/news-activity-create.component';
import { NewsActivityUpdateComponent } from './news-activity/news-activity-update/news-activity-update.component';
import { SocialListComponent } from './social/social-list/social-list.component';
import { SocialCreateComponent } from './social/social-create/social-create.component';
import { SocialUpdateComponent } from './social/social-update/social-update.component';

import { AngularEditorModule } from '@kolkov/angular-editor';
import { NewsActivityGalleryComponent } from './news-activity/news-activity-gallery/news-activity-gallery.component';
import { NewsActivityGalleryCreateComponent } from './news-activity/news-activity-gallery/news-activity-gallery-create/news-activity-gallery-create.component';
import { ServiceLocationMapListComponent } from './services/service-location-map/service-location-map-list/service-location-map-list.component';
import { ServiceLocationMapCreateComponent } from './services/service-location-map/service-location-map-create/service-location-map-create.component';
import { ServiceLocationMapUpdateComponent } from './services/service-location-map/service-location-map-update/service-location-map-update.component';
import { ProductListComponent } from './product/product/product-list/product-list.component';
import { ProductCreateComponent } from './product/product/product-create/product-create.component';
import { ProductUpdateComponent } from './product/product/product-update/product-update.component';
import { ProductCategorySubListComponent } from './product/product-category-sub/product-category-sub-list/product-category-sub-list.component';
import { ProductCategorySubCreateComponent } from './product/product-category-sub/product-category-sub-create/product-category-sub-create.component';
import { ProductCategorySubUpdateComponent } from './product/product-category-sub/product-category-sub-update/product-category-sub-update.component';
import { ProductCategoryListComponent } from './product/product-category/product-category-list/product-category-list.component';
import { ProductCategoryUpdateComponent } from './product/product-category/product-category-update/product-category-update.component';
import { ProductCategoryCreateComponent } from './product/product-category/product-category-create/product-category-create.component';
import { VillageListComponent } from './village/village-list/village-list.component';
import { VillageCreateComponent } from './village/village-create/village-create.component';
import { VillageUpdateComponent } from './village/village-update/village-update.component';
import { ProvinceListComponent } from './province/province-list/province-list.component';
import { ProvinceCreateComponent } from './province/province-create/province-create.component';
import { ProvinceUpdateComponent } from './province/province-update/province-update.component';
import { DistrictListComponent } from './district/district-list/district-list.component';
import { DistrictCreateComponent } from './district/district-create/district-create.component';
import { DistrictUpdateComponent } from './district/district-update/district-update.component';
import { ApplyWorkComponent } from './apply-work/apply-work.component';
import { BannerAdvertisingListComponent } from './banner-advertising/banner-advertising-list/banner-advertising-list.component';
import { BannerAdvertisingCreateComponent } from './banner-advertising/banner-advertising-create/banner-advertising-create.component';
import { BannerAdvertisingUpdateComponent } from './banner-advertising/banner-advertising-update/banner-advertising-update.component';
import { ProductOrderComponent } from './product/product-order/product-order.component';
import { AboutStructureCreateComponent } from './about-structure/about-structure-create/about-structure-create.component';
import { AboutStructureListComponent } from './about-structure/about-structure-list/about-structure-list.component';
import { AboutStructureUpdateComponent } from './about-structure/about-structure-update/about-structure-update.component';

// AoT requires an exported function for factories
// export function HttpLoaderFactory(http: HttpClient) {
//   return new TranslateHttpLoader(http);
// }

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json?v=' + Date.now());
}

@NgModule({
  declarations: [
    AppComponent,
    UserListComponent,
    UserCreateComponent,
    UserUpdateComponent,
    ChangePasswordComponent,
    RoleCreateComponent,
    RoleListComponent,
    RoleUpdateComponent,
    LoginComponent,
    HomeLayoutComponent,
    LoginLayoutComponent,
    HomeComponent,
    BannerListComponent,
    BannerCreateComponent,
    BannerUpdateComponent,
    WorkListComponent,
    WorkCreateComponent,
    WorkUpdateComponent,
    ServiceTypeListComponent,
    ServiceTypeCreateComponent,
    ServiceTypeUpdateComponent,
    ServiceCountryListComponent,
    ServiceCountryCreateComponent,
    ServiceCountryUpdateComponent,
    ServiceSectionListComponent,
    ServiceSectionCreateComponent,
    ServiceSectionUpdateComponent,
    ServiceLocationListComponent,
    ServiceLocationCreateComponent,
    ServiceLocationUpdateComponent,
    NewsActivityListComponent,
    NewsActivityCreateComponent,
    NewsActivityUpdateComponent,
    SocialListComponent,
    SocialCreateComponent,
    SocialUpdateComponent,
    NewsActivityGalleryComponent,
    NewsActivityGalleryCreateComponent,
    ServiceLocationMapListComponent,
    ServiceLocationMapCreateComponent,
    ServiceLocationMapUpdateComponent,
    ProductListComponent,
    ProductCreateComponent,
    ProductUpdateComponent,
    ProductCategorySubListComponent,
    ProductCategorySubCreateComponent,
    ProductCategorySubUpdateComponent,
    ProductCategoryListComponent,
    ProductCategoryUpdateComponent,
    ProductCategoryCreateComponent,
    VillageListComponent,
    VillageCreateComponent,
    VillageUpdateComponent,
    ProvinceListComponent,
    ProvinceCreateComponent,
    ProvinceUpdateComponent,
    DistrictListComponent,
    DistrictCreateComponent,
    DistrictUpdateComponent,
    ApplyWorkComponent,
    BannerAdvertisingListComponent,
    BannerAdvertisingCreateComponent,
    BannerAdvertisingUpdateComponent,
    ProductOrderComponent,
    AboutStructureCreateComponent,
    AboutStructureListComponent,
    AboutStructureUpdateComponent,

  ],
  imports: [
    NgxChartsModule,
    MatBadgeModule,
    MatDialogModule,
    MatTabsModule,
    MatRadioModule,
    MatAutocompleteModule,
    MatMenuModule,
    MatCardModule,
    MatSelectModule,
    MatSlideToggleModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSliderModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatButtonModule,
    MatTableModule,
    HttpClientModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatDividerModule,
    MatListModule,
    MatExpansionModule,
    MatDatepickerModule,
    MatNativeDateModule,
    AngularEditorModule,

    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
    HttpClient,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
