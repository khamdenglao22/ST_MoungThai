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
import { SettingComponent } from './setting/setting/setting.component';

import { PushNotificationSettingListComponent } from './push-notification-setting/push-notification-setting-list/push-notification-setting-list.component';
import { PushNotificationSettingUpdateComponent } from './push-notification-setting/push-notification-setting-update/push-notification-setting-update.component';
import { PushNotificationCreateComponent } from './push-notification/push-notification-create/push-notification-create.component';
import { CustomerListComponent } from './customer/customer-list/customer-list.component';

import { PushNotificationLogComponent } from './push-notification/push-notification-log/push-notification-log.component';
import { CustomerDetailComponent } from './customer/customer-detail/customer-detail.component';
import { AuditListComponent } from './audit/audit-list/audit-list.component';

import { LotteryWinBillsComponent } from './lottery/lottery-win-bills/lottery-win-bills.component';

import { LotterySalesDetailsComponent } from './lottery/lottery-sales-details/lottery-sales-details.component';
import { LotterySalesSummaryDateComponent } from './lottery/lottery-sales-summary-date/lottery-sales-summary-date.component';
import { LotterySalesSummaryDrawComponent } from './lottery/lottery-sales-summary-draw/lottery-sales-summary-draw.component';
import { LotteryWinSummaryComponent } from './lottery/lottery-win-summary/lottery-win-summary.component';

import { PointBalanceComponent } from './point-reward/point-balance/point-balance.component';
import { PointIssuedUsedComponent } from './point-reward/point-issued-used/point-issued-used.component';

import { PointTypeListComponent } from './point-reward/point-type/point-type-list/point-type-list.component';
import { PointTypeCreateComponent } from './point-reward/point-type/point-type-create/point-type-create.component';
import { PointTypeUpdateComponent } from './point-reward/point-type/point-type-update/point-type-update.component';
import { RewardBalanceComponent } from './reward/reward-balance/reward-balance.component';
import { RewardSummaryComponent } from './reward/reward-summary/reward-summary.component';
import { RewardPayoutSummaryComponent } from './reward/reward-payout-summary/reward-payout-summary.component';
import { RewardTransactionComponent } from './reward/reward-transaction/reward-transaction.component';
import { RewardPayoutDetailComponent } from './reward/reward-payout-detail/reward-payout-detail.component';
import { RewardTypeListComponent } from './reward/reward-type/reward-type-list/reward-type-list.component';
import { RewardTypeCreateComponent } from './reward/reward-type/reward-type-create/reward-type-create.component';
import { RewardTypeUpdateComponent } from './reward/reward-type/reward-type-update/reward-type-update.component';

const routes: Routes = [
  {
    path: environment.baseUrl,
    component: HomeLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: HomeComponent,
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
      {
        path: 'setting',
        component: SettingComponent,
      },
      {
        path: 'push-notification-setting',
        component: PushNotificationSettingListComponent,
      },
      {
        path: 'push-notification-setting/update/:id',
        component: PushNotificationSettingUpdateComponent,
      },
      {
        path: 'send-push-notification',
        component: PushNotificationCreateComponent,
      },
      {
        path: 'customer',
        component: CustomerListComponent,
      },
      {
        path: 'push-notification-log',
        component: PushNotificationLogComponent,
      },
      {
        path: 'customer/detail/:id',
        component: CustomerDetailComponent,
      },
      {
        path: 'audit-log',
        component: AuditListComponent,
      },
      {
        path: 'lottery/WinBills',
        component: LotteryWinBillsComponent,
      },
      {
        path: 'lottery/SalesDetails',
        component: LotterySalesDetailsComponent,
      },
      {
        path: 'lottery/SalesDetails',
        component: LotterySalesDetailsComponent,
      },
      {
        path: 'lottery/SalesSummaryDate',
        component: LotterySalesSummaryDateComponent,
      },
      {
        path: 'lottery/SalesSummaryDraw',
        component: LotterySalesSummaryDrawComponent,
      },
      {
        path: 'lottery/WinBills',
        component: LotteryWinBillsComponent,
      },
      {
        path: 'lottery/WinSummary',
        component: LotteryWinSummaryComponent,
      },
      {
        path: 'lottery/SalesSummaryDate',
        component: LotterySalesSummaryDateComponent,
      },
      {
        path: 'lottery/SalesSummaryDraw',
        component: LotterySalesSummaryDrawComponent,
      },
      {
        path: 'lottery/WinSummary',
        component: LotteryWinSummaryComponent,
      },
      {
        path: 'point-balance',
        component: PointBalanceComponent,
      },
      {
        path: 'point-issued-used',
        component: PointIssuedUsedComponent,
      },
      {
        path: 'point-type',
        component: PointTypeListComponent,
      },
      {
        path: 'point-type/create',
        component: PointTypeCreateComponent,
      },
      {
        path: 'point-type/update/:id',
        component: PointTypeUpdateComponent,
      },
      { path: 'reward-balance', component: RewardBalanceComponent },
      { path: 'reward-summary', component: RewardSummaryComponent },
      {
        path: 'reward-payout-summary',
        component: RewardPayoutSummaryComponent,
      },
      {
        path: 'reward-transaction',
        component: RewardTransactionComponent,
      },
      {
        path: 'reward-payout-detail',
        component: RewardPayoutDetailComponent,
      },
      {
        path: 'reward-type',
        component: RewardTypeListComponent,
      },

      {
        path: 'reward-type/create',
        component: RewardTypeCreateComponent,
      },

      {
        path: 'reward-type/update/:id',
        component: RewardTypeUpdateComponent,
      },
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
