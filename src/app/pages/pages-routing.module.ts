import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DashboardComponent} from './dashboard/dashboard.component';
import {UsersComponent} from './users/users.component';
import {CategoryComponent} from './category/category.component';
import {BrandComponent} from './service/service.component';
import {ProviderComponent} from './provider/provider.component';
import {PagesComponent} from './pages.component';
import {CouponComponent} from './coupon/coupon.component';
import {AddCouponComponent} from './coupon/add-coupon/add-coupon.component';
import {EditCouponComponent} from './coupon/edit-coupon/edit-coupon.component';
import {AddUserComponent} from './users/add-user/add-user.component';
import {EditUserComponent} from './users/edit-user/edit-user.component';
import {SettingComponent} from './setting/setting.component';
import {SubAdminComponent} from './sub-admin/sub-admin.component';
import {AddSubAdminComponent} from './sub-admin/add-sub-admin/add-sub-admin.component';
import {EditSubAdminComponent} from './sub-admin/edit-sub-admin/edit-sub-admin.component';
import {DriverComponent} from './driver/driver.component';
import {AddDriverComponent} from './driver/add-driver/add-driver.component';
import {EditDriverComponent} from './driver/edit-driver/edit-driver.component';
import {AdminProfileComponent} from './admin-profile/admin-profile.component';
import { UserBookingComponent } from './users/Booking/booking.component';
import { DriverDocumentComponent } from './driver/driver-document/driver-document.component';
import { EditProviderComponent } from './provider/edit-provider/edit-provider.component';
import { DocumentProviderComponent } from './provider/document-provider/document-provider.component';
import { AddProviderComponent } from './provider/add-provider/add-provider.component'
import { BookingComponent } from './booking/booking.component'
import { RatingReviewComponent } from './provider/rating-review/rating-review.component';
import { ContactComponent } from './contact/contact.component';
import { SuggestionsComponent } from './suggestions/suggestions.component';
import { ServicesComponent } from './provider/services/services.component';
import { CmsComponent } from './cms/cms.component';
import { UserReviewsComponent } from './users/user-reviews/user-reviews.component';
import { CommissionComponent } from './commission/commission.component';

const routes: Routes = [
  {path: '', component: PagesComponent, children: [
      {path: '', redirectTo: '/home', pathMatch: 'full'},
      {path: 'home', component: DashboardComponent},
      {path: 'users', component: UsersComponent},
      {path: 'user-review-rating/:id', component: UserReviewsComponent},
      {path: 'commission', component: CommissionComponent},
      {path: 'bookings', component: BookingComponent},
      {path: 'categories', component: CategoryComponent},
      {path: 'service', component: BrandComponent},
      {path: 'provider', component: ProviderComponent},
      {path :'add-provider',component : AddProviderComponent},
      {path: 'edit-provider/:id', component: EditProviderComponent},
      {path: 'provider-document/:id', component: DocumentProviderComponent},
      {path:'review-rating-provider/:id',component:RatingReviewComponent},
      {path:'provider-service/:id',component:ServicesComponent},
      {path: 'contact', component: ContactComponent},
      {path: 'coupons', component: CouponComponent},
      {path: 'add-user', component: AddUserComponent},
      {path: 'edit-user/:id', component: EditUserComponent},
      {path: 'user-booking/:id', component: UserBookingComponent},
      {path: 'setting', component: SettingComponent},
      {path: 'add-coupon', component: AddCouponComponent},
      {path: 'edit-coupon/:id', component: EditCouponComponent},
      {path: 'sub-admin', component: SubAdminComponent},
      {path: 'add-sub-admin', component: AddSubAdminComponent},
      {path: 'edit-sub-admin/:id', component: EditSubAdminComponent},
      {path: 'drivers', component: DriverComponent},
      {path: 'add-driver', component: AddDriverComponent},
      {path: 'edit-driver/:id', component: EditDriverComponent},
      {path: 'driver-document/:id', component: DriverDocumentComponent},
      {path: 'profile', component: AdminProfileComponent},
      {path: 'suggestions', component:SuggestionsComponent},
      {path: 'cms', component:CmsComponent},

      {path: '**', loadChildren: () => import('../page-not-found/page-not-found.module').then(m => m.PageNotFoundModule)}
    ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
