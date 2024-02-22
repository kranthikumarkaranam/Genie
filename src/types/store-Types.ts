export interface storeT {
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';
  currentRequestId?: string | null;
  error: string | null | undefined;
}

export interface asyncCartT {
  productId: number;
  quantity: number;
}

export type asyncAuthT = string;

export interface asyncOrdersT {
  orderId: number;
  orderedOn: Date; // write date type?
  orderedBy: string;
  status: {
    text: 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
    color: string;
  };
  orderTotal: number;
  orderedProducts: number[];
}
