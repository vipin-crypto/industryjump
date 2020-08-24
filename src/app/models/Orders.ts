import {Products} from './products';

export class Orders {
  status: string;
  _id: string;
  products: any;
  paymentMethod: string;
  deliveryAddress: any;
  preTaxAmount: number;
  tax: number;
  totalAmount: number;
  driver: any;
  orderId: string;
  transactionId: string;
  createdAt: string;
  updatedAt: string;
}
