export interface storeT {
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';
  currentRequestId?: string | null;
  error: string | null | undefined;
}

export interface asyncT {
  productId: number;
  quantity: number;
}
