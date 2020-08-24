export class FilterBody {
  limit: number = 10;
  skip: number = 0;
  searchText: string;
  category: string;
  role: string;
  status: any;
  subCategory: string;
  productId:any;
  page: number = 0;
  fromDate :string;
  toDate:string;
  all:boolean;
}
