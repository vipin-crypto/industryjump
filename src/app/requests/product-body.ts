export class ProductBody {
  name: string;
  images: any;
  price: number;
  productQuantity: number;
  purchaseQuantity: number;
  condition: string;
  category: string = '';
  subCategory: string = '';
  brand: string = '';
  searchKeyword: string;
  extraPrice: number;
  combo: any;
  comboDiscount: number;
  discount: number;
  description: string;
  id: string;
  topDeals: boolean = false;
  isRecommended: boolean = false;
}
