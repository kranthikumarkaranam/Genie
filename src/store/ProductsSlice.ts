import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {productApiT, productsApiT} from '../types/api-Types';
import {createAppAsyncThunk} from './pre-Typed';
import {asyncT, storeT} from '../types/store-Types';
import constants from '../util/constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {startMapper} from 'react-native-reanimated';

interface ProductsState extends storeT {
  entities: productApiT[];
}

const initialProductsState: ProductsState = {
  entities: [],
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

export const FetchCartItemsFromAsyncStorage = createAppAsyncThunk<asyncT[]>(
  'Products/fetchCartItemsFromAsyncStorage',
  async (_, {rejectWithValue, getState, requestId}) => {
    const {currentRequestId, loading} = getState().Products;
    if (loading !== 'pending' || requestId !== currentRequestId) {
      return rejectWithValue({errorMessage: 'Request canceled or pending'});
    }
    const jsonValue = await AsyncStorage.getItem('cartItems');
    const storedCartItems: asyncT[] | null =
      jsonValue != null ? JSON.parse(jsonValue) : null;
    if (storedCartItems === null) {
      return [];
    }
    return storedCartItems as asyncT[];
  },
);

const ProductsSlice = createSlice({
  name: 'Products',
  initialState: initialProductsState,
  reducers: {
    addProductToCart_ProductsSlice: (state, action: PayloadAction<number>) => {
      const id = action.payload;
      console.log('added product id => ', id);
      const product = state.entities.find(
        (item: productApiT) => item.id === id,
      );
      if (!product) {
        throw new Error(`No product with ID ${id}`);
      } else {
        product.isInCart = true;
        product.cartCount = (product.cartCount ?? 0) + 1; // Initialize cartCount to 0 if it's undefined
      }
      console.log(
        'state after adding product => ',
        product.isInCart,
        product.cartCount,
      );
    },

    removeProductFromCart_ProductsSlice: (
      state,
      action: PayloadAction<number>,
    ) => {
      const id = action.payload;
      console.log('removed product id => ', id);

      const product = state.entities.find(
        (item: productApiT) => item.id === id,
      );
      if (!product) {
        throw new Error(`No product with ID ${id}`);
      } else if (product.isInCart && product.cartCount > 0) {
        if (product.cartCount === 1) {
          product.isInCart = false;
        }
        product.cartCount -= 1;
      }
      console.log(
        'state after removing product => ',
        product.isInCart,
        product.cartCount,
      );
    },
    clearCartData: state => {
      state.entities = state.entities.map(item => ({
        ...item,
        isInCart: false,
        cartCount: 0,
      }));
    },
    clearAll_ProductsSlice: () => initialProductsState,
  },
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
            state.entities.push(product);
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
      })
      .addCase(FetchCartItemsFromAsyncStorage.pending, (state, action) => {
        if (state.loading === 'idle') {
          state.loading = 'pending';
          state.error = null;
          state.currentRequestId = action.meta.requestId;
        }
      })
      .addCase(FetchCartItemsFromAsyncStorage.fulfilled, (state, action) => {
        const {requestId} = action.meta;
        const cartItems = action.payload;
        if (
          state.loading === 'pending' &&
          state.currentRequestId === requestId
        ) {
          state.loading = 'idle';
          state.currentRequestId = undefined;
          // Loop through the cart items
          cartItems.forEach(cartItem => {
            // Find the product in the entities array with the matching productId
            const product = state.entities.find(
              entity => entity.id === cartItem.productId,
            );

            // If the product is found, update its isInCart and cartCount properties
            if (product) {
              product.isInCart = true;
              product.cartCount = cartItem.quantity;
            }
          });
        }
      })
      .addCase(FetchCartItemsFromAsyncStorage.rejected, (state, action) => {
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

export const {
  addProductToCart_ProductsSlice,
  removeProductFromCart_ProductsSlice,
  clearAll_ProductsSlice,
  clearCartData,
} = ProductsSlice.actions;
export default ProductsSlice.reducer;
