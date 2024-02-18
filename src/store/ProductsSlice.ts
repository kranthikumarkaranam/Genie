import {createSlice} from '@reduxjs/toolkit';
import {productApiT, productsApiT} from '../types/api-Types';
import {createAppAsyncThunk} from './pre-Typed';
import {storeT} from '../types/store-Types';
import constants from '../util/constants';

interface EntitiesState {
  byId: Record<number, productApiT>; // Record mapping product ID to product details
  allIds: number[]; // Array of all product IDs
}

interface ProductsState extends storeT {
  entities: EntitiesState;
}

const initialProductsState: ProductsState = {
  entities: {byId: {}, allIds: []},
  loading: 'idle',
  currentRequestId: undefined,
  error: null,
};

export const FetchAllProducts = createAppAsyncThunk<productsApiT, number>(
  'Products/fetchAllProducts',
  async (limit, {rejectWithValue, getState, requestId}) => {
    const {currentRequestId, loading} = getState().Products;
    if (loading !== 'pending' || requestId !== currentRequestId) {
      return rejectWithValue({errorMessage: 'Request canceled or pending'});
    }
    const response = await fetch(
      `${constants.API_KEY}/products/?limit=${limit}`,
    );
    return (await response.json()) as productsApiT;
  },
);

const ProductsSlice = createSlice({
  name: 'Products',
  initialState: initialProductsState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(FetchAllProducts.pending, (state, action) => {
        if (state.loading === 'idle') {
          state.loading = 'pending';
          state.error = null;
          state.currentRequestId = action.meta.requestId;
        }
      })
      .addCase(FetchAllProducts.fulfilled, (state, action) => {
        const {requestId} = action.meta;
        const products = action.payload.products;
        if (
          state.loading === 'pending' &&
          state.currentRequestId === requestId
        ) {
          state.loading = 'idle';
          state.currentRequestId = undefined;
          products.forEach(product => {
            state.entities.byId[product.id] = {...product};
            state.entities.allIds.push(product.id);
          });
        }
      })
      .addCase(FetchAllProducts.rejected, (state, action) => {
        const {requestId} = action.meta;
        if (
          state.loading === 'pending' &&
          state.currentRequestId === requestId
        ) {
          state.loading = 'idle';
          state.currentRequestId = undefined;
          if (action.payload) {
            state.error = action.payload.errorMessage;
          } else {
            state.error = action.error.message;
          }
        }
      });
  },
});

export const {} = ProductsSlice.actions;
export default ProductsSlice.reducer;
