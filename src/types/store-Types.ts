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
