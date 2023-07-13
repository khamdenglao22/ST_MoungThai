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
import { SettingComponent } from './setting/setting/setting.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatListModule } from '@angular/material/list';
import { PushNotificationSettingListComponent } from './push-notification-setting/push-notification-setting-list/push-notification-setting-list.component';
import { PushNotificationSettingUpdateComponent } from './push-notification-setting/push-notification-setting-update/push-notification-setting-update.component';
import { PushNotificationCreateComponent } from './push-notification/push-notification-create/push-notification-create.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatBadgeModule } from '@angular/material/badge';
import { CustomerListComponent } from './customer/customer-list/customer-list.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { PushNotificationLogComponent } from './push-notification/push-notification-log/push-notification-log.component';
import { CustomerDetailComponent } from './customer/customer-detail/customer-detail.component';
import { AuditListComponent } from './audit/audit-list/audit-list.component';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { environment } from '../environments/environment';
import { initializeApp } from 'firebase/app';

import { LotteryWinBillsComponent } from './lottery/lottery-win-bills/lottery-win-bills.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { LotterySalesSummaryDrawComponent } from './lottery/lottery-sales-summary-draw/lottery-sales-summary-draw.component';
import { LotterySalesSummaryDateComponent } from './lottery/lottery-sales-summary-date/lottery-sales-summary-date.component';
import { LotterySalesDetailsComponent } from './lottery/lottery-sales-details/lottery-sales-details.component';
import { LotteryWinSummaryComponent } from './lottery/lottery-win-summary/lottery-win-summary.component';

import { PointBalanceComponent } from './point-reward/point-balance/point-balance.component';
import { PointIssuedUsedComponent } from './point-reward/point-issued-used/point-issued-used.component';

import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { SaleDetailsParentComponent } from './lottery/lottery-sales-details/sale-details-parent/sale-details-parent.component';
import { WinDetailsParentComponent } from './lottery/lottery-win-summary/win-details-parent/win-details-parent.component';
import { PointTypeListComponent } from './point-reward/point-type/point-type-list/point-type-list.component';
import { PointTypeUpdateComponent } from './point-reward/point-type/point-type-update/point-type-update.component';

import { PointTypeCreateComponent } from './point-reward/point-type/point-type-create/point-type-create.component';
import { RewardBalanceComponent } from './reward/reward-balance/reward-balance.component';
import { RewardSummaryComponent } from './reward/reward-summary/reward-summary.component';
import { RewardTransactionComponent } from './reward/reward-transaction/reward-transaction.component';
import { RewardPayoutSummaryComponent } from './reward/reward-payout-summary/reward-payout-summary.component';
import { RewardPayoutDetailComponent } from './reward/reward-payout-detail/reward-payout-detail.component';
import { RewardTypeListComponent } from './reward/reward-type/reward-type-list/reward-type-list.component';
import { RewardTypeCreateComponent } from './reward/reward-type/reward-type-create/reward-type-create.component';
import { RewardTypeUpdateComponent } from './reward/reward-type/reward-type-update/reward-type-update.component';

initializeApp(environment.firebase);

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
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
    SettingComponent,
    PushNotificationSettingListComponent,
    PushNotificationSettingUpdateComponent,
    PushNotificationCreateComponent,
    CustomerListComponent,
    PushNotificationLogComponent,
    CustomerDetailComponent,
    AuditListComponent,
    LotteryWinBillsComponent,
    LotterySalesSummaryDrawComponent,
    LotterySalesSummaryDateComponent,
    LotterySalesDetailsComponent,
    LotteryWinSummaryComponent,
    LotteryWinBillsComponent,
    LotterySalesSummaryDrawComponent,
    LotterySalesSummaryDateComponent,
    LotterySalesDetailsComponent,
    LotteryWinSummaryComponent,
    PointBalanceComponent,
    PointIssuedUsedComponent,
    PointTypeListComponent,
    PointTypeUpdateComponent,
    PointTypeCreateComponent,
    RewardBalanceComponent,
    RewardSummaryComponent,
    RewardTransactionComponent,
    RewardPayoutSummaryComponent,
    RewardPayoutDetailComponent,
    RewardTypeListComponent,
    RewardTypeCreateComponent,
    RewardTypeUpdateComponent,
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
