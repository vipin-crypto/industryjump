import { Injectable } from '@angular/core';
import { FilterBody } from 'src/app/requests/filter-body';

@Injectable({
  providedIn: 'root'
})
export class UrlService {
  baseUrl = 'https://appgrowthcompany.com:9034/api/v1';
  imageUrl = 'https://appgrowthcompany.com:9034';

  constructor() { }
  login = `${this.baseUrl}/admin/auth/singIn`;
  dashboard=`${this.baseUrl}/admin/dashboard`;
  dashboardgraph=`${this.baseUrl}/admin/dashboard/getGraphData`;
  getUsersUrl = `${this.baseUrl}/admin/user`;
  getProfileUrl = `${this.baseUrl}/admin/getProfile`;
  changePasswordUrl = `${this.baseUrl}/admin/changePassword`;
  updateProfileUrl = `${this.baseUrl}/admin/updateProfile`;
  updateimageUrl = `${this.baseUrl}/admin/user/uploadDocumentImage`;
  updateDoumentUrl = `${this.baseUrl}/admin/user/documentUpload`;
  getAllCategoriesUrl = `${this.baseUrl}/admin/category`;
  changeOrderUrl = `${this.baseUrl}/admin/category/changeOrder`;
  getAllCommissionUrl = `${this.baseUrl}/admin/commission`;
  categoryUrl = `${this.baseUrl}/admin/category`;
  commissionUrl= `${this.baseUrl}/admin/commission`;
  valueUrl =`${this.baseUrl}/admin/get_options`;
  getAllServiceUrl = `${this.baseUrl}/admin/service`;
  getcontactList  = `${this.baseUrl}/admin/contacts`;
  getAllBanner = `${this.baseUrl}/admin/getAllBanners`;
  getAllCouponUrl = `${this.baseUrl}/admin/getAllCoupons`;
  getAllGiftCardUrl = `${this.baseUrl}/admin/gift_card`;
  getAllDriverUrl = `${this.baseUrl}/admin/getAllDrivers`;
  getAllOfferUrl = `${this.baseUrl}/admin/getAllOffers`;
  resetPasswordUrl = `${this.baseUrl}/admin/resetPassword`;
  getAllOrdersUrl = `${this.baseUrl}/admin/getAllOrders`;
  getAllSubCategories = `${this.baseUrl}/admin/getSubCategories`;
  getAllSubAdminUrl = `${this.baseUrl}/admin/getAllSubAdmin`;
  getProductUrl = `${this.baseUrl}/admin/getAllProduct`;
  getReview = `${this.baseUrl}/admin/get_rating_list`;
  ServiceUrl = `${this.baseUrl}/admin/service`;
  userBookingUrl =id =>`${this.baseUrl}/admin/user/getUserBookings/${id}`
  BookingUrl =`${this.baseUrl}/admin/booking/getBookingHistory`;
  Cancelbooking=`${this.baseUrl}/admin/booking/process_booking`
  assignToDriverUrl = `${this.baseUrl}/admin/assignToDriver`;
  suggestionUrl =`${this.baseUrl}/admin/suggestion`;
  subCategoryUrl = `${this.baseUrl}/admin/subCategory`;
  couponUrl = `${this.baseUrl}/admin/coupon`;
  productUrl = `${this.baseUrl}/admin/product`;
  forgotPasswordUrl = `${this.baseUrl}/admin/auth/forgot_password`;
  UserUrl = `${this.baseUrl}/admin/user`;
  settingUrl = `${this.baseUrl}/admin/setting`;
  driverUrl = `${this.baseUrl}/admin/driver`;
  driverDocument =`${this.baseUrl}/admin/update_driver_document`;
  UserDocument=id =>`${this.baseUrl}/admin/user/updateUserDocument/${id}`;
  getUsersUrlByrole =role=> `${this.baseUrl}/admin/user?role=${role}`;
   offerUrl = `${this.baseUrl}/admin/offer`;
  subAdminUrl = `${this.baseUrl}/admin/subAdmin`;
  uploadImageUrl = `${this.baseUrl}/admin/uploadProductImage`;
  getPagesUrl = `${this.baseUrl}/admin/setting`;
  processOrderUrl = id => `${this.baseUrl}/admin/order/${id}`;
  getProductBySubCat = id => `${this.productUrl}?id=${id}`;
  getProviderRatingUrl = id => `${this.baseUrl}/admin/rating/${id.id}?role=${id.role}`;
  ProviderRatingUrl =id => `${this.baseUrl}/admin/rating/${id}`;
  getProviderServicesUrl = id => `${this.baseUrl}/admin/user/getProviderServices/${id}`;
  getUserDetailUrl = id => `${this.baseUrl}/admin/user/getUserDetail/${id}`;
  approveUrl = id=> `${this.baseUrl}/admin/user/statusUpdate/${id}`;
  editBannerStatusUrl = id => `${this.baseUrl}/admin/updateBannerStatus/${id}`;
  getProductDetailsUrl = id => `${this.baseUrl}/admin/getProductDetails/${id}`;
  getCouponDetailsUrl = id => `${this.baseUrl}/admin/getCouponDetails/${id}`;
  getGiftCardDetailsUrl = id => `${this.baseUrl}/admin/getGiftCardDetail/${id}`;
  getchatHistoryUrl =id =>`${this.baseUrl}/admin/get_chat_list/${id}`
  getDriverDetailsUrl = id => `${this.baseUrl}/admin/getDriverDetails/${id}`;
  getAdminDetailsUrl = id => `${this.baseUrl}/admin/getAdminDetails/${id}`;
  getAllSubCat = id => `${this.subCategoryUrl}?category=${id}`;
  deleteCategoryUrl = id => `${this.categoryUrl}?id=${id}`;
  deleteCommissionUrl = id => `${this.commissionUrl}?id=${id}`;

  deleteServiceUrl = id => `${this.ServiceUrl}?id=${id}`;
  deleteCouponUrl = id => `${this.couponUrl}?id=${id}`;
  deleteGiftCardUrl = id => `${this.getAllGiftCardUrl}?id=${id}`;
  deleteSubCategoryUrl = id => `${this.subCategoryUrl}?id=${id}`;
  deleteProductUrl = id => `${this.productUrl}?id=${id}`;
  deleteUserUrl = id => `${this.UserUrl}?id=${id}`;
  deleteSubAdminUrl = id => `${this.subAdminUrl}?id=${id}`;
  deleteDriverUrl = id => `${this.driverUrl}?id=${id}`;
  getSubCatDetail = id => `${this.baseUrl}/admin/getSubCatDetail/${id}`;
  deleteOfferUrl = id => `${this.offerUrl}?id=${id}`;
}
