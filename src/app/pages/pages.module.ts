import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesRoutingModule } from './pages-routing.module';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UsersComponent } from './users/users.component';
import {MatPaginatorModule} from '@angular/material/paginator';
import {BsDatepickerModule} from 'ngx-bootstrap/datepicker';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import {TabsModule} from 'ngx-bootstrap/tabs';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { CategoryComponent } from './category/category.component';
import { BrandComponent } from './service/service.component';
import { ProviderComponent } from './provider/provider.component';
import { CategoryModalComponent } from './category/category-modal/category-modal.component';
import { ServiceModalComponent } from './service/service-modal/service-modal.component';
import { CouponComponent } from './coupon/coupon.component';
import {NgCircleProgressModule} from 'ng-circle-progress';
import {UiSwitchModule} from 'ngx-toggle-switch';
import {NgImageSliderModule} from 'ng-image-slider';
import { AddCouponComponent } from './coupon/add-coupon/add-coupon.component';
import { EditCouponComponent } from './coupon/edit-coupon/edit-coupon.component';
import {NumberOnlyDirective} from './directives/number-only/number-only.directive';
import { EditUserComponent } from './users/edit-user/edit-user.component';
import { AddUserComponent } from './users/add-user/add-user.component';
import { SettingComponent } from './setting/setting.component';
import { SubAdminComponent } from './sub-admin/sub-admin.component';
import { AddSubAdminComponent } from './sub-admin/add-sub-admin/add-sub-admin.component';
import { EditSubAdminComponent } from './sub-admin/edit-sub-admin/edit-sub-admin.component';
import { DriverComponent } from './driver/driver.component';
import { AddDriverComponent } from './driver/add-driver/add-driver.component';
import { EditDriverComponent } from './driver/edit-driver/edit-driver.component';
import { AdminProfileComponent } from './admin-profile/admin-profile.component';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {NgMultiSelectDropDownModule} from 'ng-multiselect-dropdown';
import { NgSelect2Module } from 'ng-select2';
import { CharacterOnlyDirective } from './directives/character-only/character-only.directive';
import { DecimalnumberDirective } from './directives/decimal-only/decimalnumber.directive';
import { UserBookingComponent } from './users/Booking/booking.component';
import { DriverDocumentComponent } from './driver/driver-document/driver-document.component';
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';
import { MaterialModule } from '../modules/material/material.module';
import { EditProviderComponent } from './provider/edit-provider/edit-provider.component';
import { DocumentProviderComponent } from './provider/document-provider/document-provider.component';
import {DataTablesModule} from 'angular-datatables';
import { SelectDropDownModule } from 'ngx-select-dropdown';
import { AddProviderComponent } from './provider/add-provider/add-provider.component';
import { BookingComponent } from './booking/booking.component';
import { UserModalComponent } from './booking/user-modal/user-modal.component';
import { ProviderModalComponent } from './booking/provider-modal/provider-modal.component';
import { ServicesModalComponent } from './booking/services-modal/services-modal.component';
import { BarRatingModule } from "ngx-bar-rating";
import { RatingModule } from 'ng-starrating';
import { ChatModalComponent } from './booking/chat-modal/chat-modal.component';
import { RatingReviewComponent } from './provider/rating-review/rating-review.component';
import { UserReviewsComponent } from './users/user-reviews/user-reviews.component';

import { ContactComponent } from './contact/contact.component';
import { SuggestionsComponent } from './suggestions/suggestions.component';
import { ServicesComponent } from './provider/services/services.component';
import { CmsComponent } from './cms/cms.component';
import {RichTextEditorAllModule  } from '@syncfusion/ej2-angular-richtexteditor';
import { CommissionComponent } from './commission/commission.component';
import { CommissionModalComponent } from './commission/commission-modal/commission-modal.component';
// import { CommissionComponent } from './commission/commission.component';

@NgModule({
    declarations: [
        PagesComponent,
        DashboardComponent,
        UsersComponent,
        CategoryComponent,
        BrandComponent,
        ProviderComponent,
        CategoryModalComponent,
        ServiceModalComponent,
        CouponComponent,
        EditProviderComponent,
         DocumentProviderComponent,
        // ProductComponent,
        // AddProductComponent,
        // EditProductComponent,
        // ImageModalComponent,
        UserReviewsComponent,
        AddCouponComponent,
        EditCouponComponent,
        NumberOnlyDirective,
        EditUserComponent,
        AddUserComponent,
        SettingComponent,
        SubAdminComponent,
        AddSubAdminComponent,
        EditSubAdminComponent,
        DriverComponent,
        AddDriverComponent,
        EditDriverComponent,
        AdminProfileComponent,
        CharacterOnlyDirective,
        DecimalnumberDirective,
        UserBookingComponent,
        DriverDocumentComponent,
        AddProviderComponent,
        BookingComponent,
        UserModalComponent,
        ProviderModalComponent,
        ServicesModalComponent,
        ChatModalComponent,
        RatingReviewComponent,
        ContactComponent,
        SuggestionsComponent,
        ServicesComponent,
        CmsComponent,
        CommissionComponent,
        CommissionModalComponent,
        // CommissionComponent,
        
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        DataTablesModule,
        // MaterialModule,
        // MatChipsModule,
        PagesRoutingModule,
        PaginationModule.forRoot(),
        NgCircleProgressModule.forRoot(),
        UiSwitchModule,
        RichTextEditorAllModule,
        NgImageSliderModule,
        RatingModule ,
        BarRatingModule,
        BsDatepickerModule.forRoot(),
        // TabsModule.forRoot(),
        DragDropModule,
        NgMultiSelectDropDownModule.forRoot(),
        SelectDropDownModule,
        NgSelect2Module,
        GooglePlaceModule,
        MaterialModule
    ],
    exports: [
        NumberOnlyDirective,
        DecimalnumberDirective
    ],
    entryComponents: [
        CategoryModalComponent,
        ServiceModalComponent,
        // ImageModalComponent,
    
    ]
})
export class PagesModule { }
