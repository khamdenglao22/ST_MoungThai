import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RoleCreateComponent } from './role/role-create/role-create.component';
import { RoleListComponent } from './role/role-list/role-list.component';
import { RoleUpdateComponent } from './role/role-update/role-update.component';
import { ChangePasswordComponent } from './user/change-password/change-password.component';
import { UserCreateComponent } from './user/user-create/user-create.component';
import { UserListComponent } from './user/user-list/user-list.component';
import { UserUpdateComponent } from './user/user-update/user-update.component';
import { AuthGuard } from './guard/auth.guard';
import { AppComponent } from './app.component';
import { HomeLayoutComponent } from './layout/home-layout/home-layout.component';
import { HomeComponent } from './home/home.component';
import { LoginLayoutComponent } from './layout/login-layout/login-layout.component';

import { environment } from '../environments/environment';

import { BannerCreateComponent } from './banner/banner-create/banner-create.component';
import { BannerListComponent } from './banner/banner-list/banner-list.component';
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
import { ServiceLocationListComponent } from './services/service-location/service-location-list/service-location-list.component';
import { ServiceLocationCreateComponent } from './services/service-location/service-location-create/service-location-create.component';
import { ServiceLocationUpdateComponent } from './services/service-location/service-location-update/service-location-update.component';
import { ServiceSectionListComponent } from './services/service-section/service-section-list/service-section-list.component';
import { ServiceSectionCreateComponent } from './services/service-section/service-section-create/service-section-create.component';
import { ServiceSectionUpdateComponent } from './services/service-section/service-section-update/service-section-update.component';
import { NewsActivityListComponent } from './news-activity/news-activity-list/news-activity-list.component';
import { NewsActivityCreateComponent } from './news-activity/news-activity-create/news-activity-create.component';
import { NewsActivityUpdateComponent } from './news-activity/news-activity-update/news-activity-update.component';
import { SocialListComponent } from './social/social-list/social-list.component';
import { SocialCreateComponent } from './social/social-create/social-create.component';
import { SocialUpdateComponent } from './social/social-update/social-update.component';
import { NewsActivityGalleryComponent } from './news-activity/news-activity-gallery/news-activity-gallery.component';
import { NewsActivityGalleryCreateComponent } from './news-activity/news-activity-gallery/news-activity-gallery-create/news-activity-gallery-create.component';
import { ServiceLocationMapListComponent } from './services/service-location-map/service-location-map-list/service-location-map-list.component';
import { ServiceLocationMapCreateComponent } from './services/service-location-map/service-location-map-create/service-location-map-create.component';
import { ServiceLocationMapUpdateComponent } from './services/service-location-map/service-location-map-update/service-location-map-update.component';
import { ProductListComponent } from './product/product/product-list/product-list.component';
import { ProductCreateComponent } from './product/product/product-create/product-create.component';
import { ProductUpdateComponent } from './product/product/product-update/product-update.component';
import { ProductCategoryListComponent } from './product/product-category/product-category-list/product-category-list.component';
import { ProductCategoryCreateComponent } from './product/product-category/product-category-create/product-category-create.component';
import { ProductCategoryUpdateComponent } from './product/product-category/product-category-update/product-category-update.component';
import { ProductCategorySubListComponent } from './product/product-category-sub/product-category-sub-list/product-category-sub-list.component';
import { ProductCategorySubCreateComponent } from './product/product-category-sub/product-category-sub-create/product-category-sub-create.component';
import { ProductCategorySubUpdateComponent } from './product/product-category-sub/product-category-sub-update/product-category-sub-update.component';
import { ProvinceListComponent } from './province/province-list/province-list.component';
import { ProvinceCreateComponent } from './province/province-create/province-create.component';
import { ProvinceUpdateComponent } from './province/province-update/province-update.component';
import { DistrictListComponent } from './district/district-list/district-list.component';
import { DistrictCreateComponent } from './district/district-create/district-create.component';
import { DistrictUpdateComponent } from './district/district-update/district-update.component';
import { VillageListComponent } from './village/village-list/village-list.component';
import { VillageCreateComponent } from './village/village-create/village-create.component';
import { VillageUpdateComponent } from './village/village-update/village-update.component';
import { ApplyWorkComponent } from './apply-work/apply-work.component';
import { BannerAdvertisingListComponent } from './banner-advertising/banner-advertising-list/banner-advertising-list.component';
import { BannerAdvertisingCreateComponent } from './banner-advertising/banner-advertising-create/banner-advertising-create.component';
import { BannerAdvertisingUpdateComponent } from './banner-advertising/banner-advertising-update/banner-advertising-update.component';
import { ProductOrderComponent } from './product/product-order/product-order.component';
import { AboutStructureListComponent } from './about-structure/about-structure-list/about-structure-list.component';
import { AboutStructureCreateComponent } from './about-structure/about-structure-create/about-structure-create.component';
import { AboutStructureUpdateComponent } from './about-structure/about-structure-update/about-structure-update.component';

const routes: Routes = [
  {
    path: environment.baseUrl,
    component: HomeLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: BannerListComponent,
      },
      {
        path: 'role',
        component: RoleListComponent,
      },
      {
        path: 'role/update/:id',
        component: RoleUpdateComponent,
      },
      {
        path: 'role/create',
        component: RoleCreateComponent,
      },
      {
        path: 'users',
        component: UserListComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'users/create',
        component: UserCreateComponent,
      },
      {
        path: 'users/update/:id',
        component: UserUpdateComponent,
      },
      {
        path: 'users/change-password/:id',
        component: ChangePasswordComponent,
      },

      // STI
      {
        path: 'banner',
        component: BannerListComponent,
      },
      {
        path: 'banner/create',
        component: BannerCreateComponent,
      },
      {
        path:'banner/update/:id',
        component:BannerUpdateComponent
      },
      {
        path:'work',
        component:WorkListComponent
      },
      {
        path:'work/create',
        component:WorkCreateComponent
      },
      {
        path:'work/update/:id',
        component:WorkUpdateComponent
      },
      {
        path:'service-type',
        component:ServiceTypeListComponent
      },
      {
        path:'service-type/create',
        component:ServiceTypeCreateComponent
      },
      {
        path:'service-type/update/:id',
        component:ServiceTypeUpdateComponent
      },
      {
        path:'service-country',
        component:ServiceCountryListComponent
      },
      {
        path:'service-country/create',
        component: ServiceCountryCreateComponent
      },
      {
        path:'service-country/update/:id',
        component:ServiceCountryUpdateComponent
      },
      {
        path:'service-location',
        component:ServiceLocationListComponent
      },
      {
        path:'service-location/create',
        component: ServiceLocationCreateComponent
      },
      {
        path:'service-location/update/:id',
        component:ServiceLocationUpdateComponent
      },
      {
        path:'service-section',
        component:ServiceSectionListComponent
      },
      {
        path:'service-section/create',
        component: ServiceSectionCreateComponent
      },
      {
        path:'service-section/update/:id',
        component:ServiceSectionUpdateComponent
      },
      {
        path:'news-activity',
        component:NewsActivityListComponent
      },
      {
        path:'news-activity/create',
        component:NewsActivityCreateComponent
      },
      {
        path:'news-activity/update/:id',
        component:NewsActivityUpdateComponent
      },
      {
        path:'news-activity/gallery/:id',
        component:NewsActivityGalleryComponent
      },

      {
        path:'news-activity/gallery/create/:id',
        component:NewsActivityGalleryCreateComponent
      },
      {
        path:'social',
        component:SocialListComponent
      },
      {
        path:'social/create',
        component:SocialCreateComponent
      },
      {
        path:'social/update/:id',
        component:SocialUpdateComponent
      },
      {
        path:'service-location-map/list',
        component:ServiceLocationMapListComponent
      },
      {
        path:'service-location-map/create',
        component:ServiceLocationMapCreateComponent
      },
      {
        path:'service-location-map/update/:id',
        component:ServiceLocationMapUpdateComponent
      },
      {
        path:'product',
        component:ProductListComponent
      },
      {
        path:'product/create',
        component:ProductCreateComponent
      },
      {
        path:'product/update/:id',
        component:ProductUpdateComponent
      },
      {
        path:'product-category',
        component:ProductCategoryListComponent
      },
      {
        path:'product-category/create',
        component:ProductCategoryCreateComponent
      },
      {
        path:'product-category/update/:id',
        component:ProductCategoryUpdateComponent
      },
      {
        path:'product-category-sub',
        component:ProductCategorySubListComponent
      },
      {
        path:'product-category-sub/create',
        component:ProductCategorySubCreateComponent
      },
      {
        path:'product-category-sub/update/:id',
        component:ProductCategorySubUpdateComponent
      },
      {
        path:'province',
        component:ProvinceListComponent
      },
      {
        path:'province/create',
        component:ProvinceCreateComponent
      },
      {
        path:'province/update/:id',
        component:ProvinceUpdateComponent
      },
      {
        path:'district',
        component:DistrictListComponent
      },
      {
        path:'district/create',
        component:DistrictCreateComponent
      },
      {
        path:'district/update/:id',
        component:DistrictUpdateComponent
      },
      {
        path:'village',
        component:VillageListComponent
      },
      {
        path:'village/create',
        component:VillageCreateComponent
      },
      {
        path:'village/update/:id',
        component:VillageUpdateComponent
      },
      {
        path:'apply-work',
        component:ApplyWorkComponent
      },
      {
        path:'banner-advertising',
        component:BannerAdvertisingListComponent
      },
      {
        path:'banner-advertising/create',
        component:BannerAdvertisingCreateComponent
      },
      {
        path:'banner-advertising/update/:id',
        component:BannerAdvertisingUpdateComponent
      },
      {
        path:'product-order',
        component:ProductOrderComponent
      },
      {
        path:'about-structure',
        component:AboutStructureListComponent
      },
      {
        path:'about-structure/create',
        component:AboutStructureCreateComponent
      },
      {
        path:'about-structure/update/:id',
        component:AboutStructureUpdateComponent
      }

    ],
  },
  {
    path: environment.baseUrl,
    component: LoginLayoutComponent,
    children: [
      {
        path: 'login',
        component: LoginComponent,
      },
    ],
  },
  {
    path: '**',
    redirectTo: environment.baseUrl + '/login',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
