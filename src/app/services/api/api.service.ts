import { Injectable } from '@angular/core';
import {HttpClient, HttpEventType, HttpHeaders} from '@angular/common/http';
import {UrlService} from '../url/url.service';
import {LoginBody} from '../../requests/login-body';
import {FilterBody} from '../../requests/filter-body';
import {map} from 'rxjs/operators';
import {ProductBody} from '../../requests/product-body';
import {CouponBody} from '../../requests/coupon-body';
import {AddUserBody} from '../../requests/add-user-body';
import {AddSubAdminBody} from '../../requests/add-sub-admin-body';
import {DriverBody} from '../../requests/driver-body';
import { GiftCardBody } from 'src/app/requests/giftcard-body copy';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(

    private http: HttpClient,
    private url: UrlService
  ) { }
  getCountryCode() {
    return this.http
      .get<any>("assets/json/countryCode.json")
      .pipe(map(response => response));
  }
  singIn(body: LoginBody) {
    return this.http.post(this.url.login, body);
  }
  getDahboard(){
    return this.http.get(this.url.dashboard);
  }
  getDahboardGraph(body){
    return this.http.post(this.url.dashboardgraph,body);

  }
  getUsers(role) {
    return this.http.get(this.url.getUsersUrlByrole(role));
  }
  getAllCategories(body:any) {
    return this.http.get(this.url.getAllCategoriesUrl,body);
  }
  addCategory(body: FormData) {
    return this.http.post(this.url.categoryUrl, body);
  }
  deleteCategory(id: string) {
    return this.http.delete(this.url.deleteCategoryUrl(id));
  }
  updateCategory(body: FormData) {
    return this.http.put(this.url.categoryUrl, body);
  }
  getAllService() {
    return this.http.get(this.url.getAllServiceUrl);
  }
  getAllBooking(body) {
  return this.http.post(this.url.BookingUrl, body);
  }
  Cancelbooking(body: any) {
    return this.http.post(this.url.Cancelbooking, body);
  }
  getContactList(){
    return this.http.get(this.url.getcontactList);
  }
  getUserBooking(id) {
    return this.http.get(this.url.userBookingUrl(id));
    }
  addService(body: FormData) {
    return this.http.post(this.url.ServiceUrl, body);
  }
  editService(body: FormData) {
    return this.http.put(this.url.ServiceUrl, body);
  }
  deleteService(id: string) {
    return this.http.delete(this.url.deleteServiceUrl(id));
  }
  getAllSuggestions() {
    return this.http.get(this.url.suggestionUrl);
    }
  getCoupons() {
    return this.http.get(this.url.couponUrl);
  }
  getSubCat(body: FilterBody) {
    return this.http.post(this.url.getAllSubCategories, body);
  }
  addSubCat(body: FormData) {
    return this.http.post(this.url.subCategoryUrl, body);
  }
  editSubCat(body: FormData) {
    return this.http.put(this.url.subCategoryUrl, body);
  }
  deleteSubCat(id: string) {
    return this.http.delete(this.url.deleteSubCategoryUrl(id));
  }
  getCategories() {
    return this.http.get(this.url.categoryUrl);
  }
  getValues() {
    return this.http.get(this.url.valueUrl);
  }
  getBrands() {
    return this.http.get(this.url.ServiceUrl);
  }
  getSubCatWithoutPagination(id: string) {
    return this.http.get(this.url.getAllSubCat(id));
  }
  addProduct(body: ProductBody) {
    return this.http.post(this.url.productUrl, body);
  }
  editProduct(body: any) {
    return this.http.put(this.url.productUrl, body);
  }
  deleteProduct(id: string) {
    return this.http.delete(this.url.deleteProductUrl(id));
  }
  getProductWithPagination(body: FilterBody) {
    return this.http.post(this.url.getProductUrl, body);
  }
  getReviewWithPagination(body:FilterBody){
    return this.http.post(this.url.getReview, body);
  
  }
  getProductDetail(id: string) {
    return this.http.get(this.url.getProductDetailsUrl(id));
  }
  addCoupon(body: CouponBody) {
    return this.http.post(this.url.couponUrl, body);
  }
  editCoupon(body: any) {
    return this.http.put(this.url.couponUrl, body);
  }
  deleteCoupon(id: string) {
    return this.http.delete(this.url.deleteCouponUrl(id));
  }
  getAllCoupons(body: FilterBody) {
    return this.http.post(this.url.getAllCouponUrl, body);
  }
  getAllGiftCard(body: any) {
    return this.http.get(this.url.getAllGiftCardUrl, body);
  }
  addGiftCard(body: GiftCardBody) {
    return this.http.post(this.url.getAllGiftCardUrl, body);
  }
  editGiftCard(body: any) {
    return this.http.put(this.url.getAllGiftCardUrl, body);
  }
  deleteGiftCard(id: string) {
    return this.http.delete(this.url.deleteGiftCardUrl(id));
  }
  getGiftCardDetail(id: string) {
    return this.http.get(this.url.getGiftCardDetailsUrl(id));
  }
  getChatHistory(id: string) {
    return this.http.get(this.url.getchatHistoryUrl(id));
  }
  getCouponDetail(id: string) {
   return this.http.get(this.url.getCouponDetailsUrl(id));
  }
  editBannerStatus(id: string) {
    return this.http.get(this.url.editBannerStatusUrl(id));
  }
  addProvider(body: any) {
    return this.http.post(this.url.UserUrl, body);
  }
  editUser(body: any) {
    return this.http.put(this.url.UserUrl, body);
  }
   approvedUser(body: any,id) {
    return this.http.put(this.url.approveUrl(id),body);
  }
  deleteUser(id: string) {
    return this.http.delete(this.url.deleteUserUrl(id));
  }
  getUserDetail(id: string) {
    return this.http.get(this.url.getUserDetailUrl(id));
  }
   getProviderReview(body) {
     console.log(body)
    return this.http.get(this.url.getProviderRatingUrl(body));
  }
   deleteProviderReview(id: string) {
    return this.http.delete(this.url.ProviderRatingUrl(id));
  }
  updateProviderReview(id,body) {
    return this.http.put(this.url.ProviderRatingUrl(id), body);
  }
  getProviderServices(id: string) {
    return this.http.get(this.url.getProviderServicesUrl(id));
  }
  addSetting(body: any) {
    return this.http.post(this.url.settingUrl, body);
  }
  editSetting(body: any) {
    return this.http.put(this.url.settingUrl, body);
  }
  getSetting() {
    return this.http.get(this.url.settingUrl);
  }
  getStaticPages() {
    return this.http.get(this.url.getPagesUrl);
  }
  saveStaticPages(body:any){
    return this.http.put(this.url.getPagesUrl,body);
   }
  addSubAdmin(body: AddSubAdminBody) {
    return this.http.post(this.url.subAdminUrl, body);
  }
  editSubAdmin(body: any) {
    return this.http.put(this.url.subAdminUrl, body);
  }
  deleteSubAdmin(id: string) {
    return this.http.delete(this.url.deleteSubAdminUrl(id));
  }
  getAllSubAdmin(body: FilterBody) {
    return this.http.post(this.url.getAllSubAdminUrl, body);
  }
  getAdminDetails(id: string) {
    return this.http.get(this.url.getAdminDetailsUrl(id));
  }
  getAllDriverWithoutPagination() {
    return this.http.get(this.url.driverUrl);
  }
  getDrivers(body: FilterBody) {
    return this.http.post(this.url.getAllDriverUrl, body);
  }
  addDriver(body:any) {
    return this.http.post(this.url.driverUrl, body);
  }
  editDriver(body: any) {
    return this.http.put(this.url.driverUrl, body);
  }
  updateDriverDocument(body:any){
    return this.http.post(this.url.driverDocument, body);
 }
  updateuserDocument(body:any,id){
    return this.http.put(this.url.UserDocument(id),body);
}
updateimage(body){
  console.log(body,"========")
  return this.http.post(this.url.updateimageUrl,body);
}
updatedocumentimage(body)
{
  console.log(body,"========")
  return this.http.post(this.url.updateDoumentUrl,body);
}
  deleteDriver(id: string) {
    return this.http.delete(this.url.deleteDriverUrl(id));
  }
  getDriverDetails(id: string) {
    return this.http.get(this.url.getDriverDetailsUrl(id));
  }
  updateProfile(body: any) {
    return this.http.post(this.url.updateProfileUrl, body);
  }
  changePassword(body: any) {
    return this.http.post(this.url.changePasswordUrl, body);
  }
  getProfile() {
    return this.http.get(this.url.getProfileUrl);
  }
  getSubCatProduct(id: string) {
    return this.http.get(this.url.getProductBySubCat(id));
  }
  getSubCatDetails(id: string) {
    return this.http.get(this.url.getSubCatDetail(id));
  }
  forgotPassword(body: any) {
    return this.http.post(this.url.forgotPasswordUrl, body);
  }
  resetPassword(body: any) {
    return this.http.post(this.url.resetPasswordUrl, body);
  }
  processOrder(id: string, body: any) {
    return this.http.put(this.url.processOrderUrl(id), body);
  }
  getAllCommission() {
    return this.http.get(this.url.getAllCommissionUrl,);
  }
  addCommssion(body) {
    return this.http.post(this.url.commissionUrl, body);
  }
  deleteCommission(id: string) {
    return this.http.delete(this.url.deleteCommissionUrl(id));
  }
  updateCommission(body) {
    return this.http.put(this.url.commissionUrl, body);
  }
  changeOrder(body: any) {
    return this.http.post(this.url.changeOrderUrl, body);
  }
  uploadImage(body: FormData) {
    return this.http.post(this.url.uploadImageUrl, body, {
      reportProgress: true,
      observe: 'events'
    }).pipe(map((event: any) => {
      switch (event.type) {

        case HttpEventType.UploadProgress:
          const progress = Math.round(100 * event.loaded / event.total);
          return { success: true, message: 'progress', data: progress };

        case HttpEventType.Response:
          return event.body;
        default:
          return `Unhandled event: ${event.type}`;
      }
    }));
  }
}
