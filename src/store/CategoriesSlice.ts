import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {CategoriesApiT, productApiT, productsApiT} from '../types/api-Types';
import {createAppAsyncThunk} from './pre-Typed';
import {storeT} from '../types/store-Types';
import constants from '../util/constants';
import {formatCategory} from '../util/UtilityFunctions';

export interface Category {
  id: number;
  name: string;
  products: productApiT[]; // Array of products belonging to this category
}

interface CategoriesState extends storeT {
  entities: Category[];
}

const initialCategoriesState: CategoriesState = {
  entities: [],
  loading: 'idle',
  currentRequestId: undefined,
  error: null,
};

export const FetchAllCategories = createAppAsyncThunk<CategoriesApiT>(
  'Categories/fetchAllCategories',
  async (_, {rejectWithValue, getState, requestId}) => {
    const {currentRequestId, loading} = getState().Categories;
    if (loading !== 'pending' || requestId !== currentRequestId) {
      return rejectWithValue({errorMessage: 'Request canceled or pending'});
    }
    const response = await fetch(`${constants.API_KEY}/products/categories`);
    return (await response.json()) as CategoriesApiT;
  },
);

export const FetchAllProductsByCategory = createAppAsyncThunk<
  productsApiT,
  string
>(
  'Categories/fetchAllProductsByCategory',
  async (categoryName, {rejectWithValue, getState, requestId}) => {
    const {currentRequestId, loading} = getState().Categories;
    if (loading !== 'pending' || requestId !== currentRequestId) {
      return rejectWithValue({errorMessage: 'Request canceled or pending'});
    }
    const response = await fetch(
      `${constants.API_KEY}/products/category/${categoryName}`,
    );
    return (await response.json()) as productsApiT;
  },
);

const CategoriesSlice = createSlice({
  name: 'Categories',
  initialState: initialCategoriesState,
  reducers: {
    addProductToCart_CategoriesSlice: (
      state,
      action: PayloadAction<number>,
    ) => {
      const id = action.payload;
      console.log('added product id => ', id);

      // Find the category that contains the product
      const categoryWithProduct = state.entities.find(category =>
        category.products.some(product => product.id === id),
      );

      // If the category is found, then find the product in the array of products
      if (categoryWithProduct) {
        const product = categoryWithProduct.products.find(
          product => product.id === id,
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
      }
    },
    removeProductFromCart_CategoriesSlice: (
      state,
      action: PayloadAction<number>,
    ) => {
      const id = action.payload;
      console.log('removed product id => ', id);

      // Find the category that contains the product
      const categoryWithProduct = state.entities.find(category =>
        category.products.some(product => product.id === id),
      );

      // If the category is found, then find the product in the array of products
      if (categoryWithProduct) {
        const product = categoryWithProduct.products.find(
          product => product.id === id,
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
      }
    },
    clearAll_CategoriesSlice: () => initialCategoriesState,
  },
  extraReducers: builder => {
    builder
      .addCase(FetchAllCategories.pending, (state, action) => {
        if (state.loading === 'idle') {
          state.loading = 'pending';
          state.error = null;
          state.currentRequestId = action.meta.requestId;
        }
      })
      .addCase(FetchAllCategories.fulfilled, (state, action) => {
        const {requestId} = action.meta;
        if (
          state.loading === 'pending' &&
          state.currentRequestId === requestId
        ) {
          state.loading = 'idle';
          state.currentRequestId = undefined;
          action.payload.forEach((categoryName, index) => {
            state.entities.push({
              id: index + 1, // Assuming categoryIDs start from 1
              name: formatCategory(categoryName), // Format the category name
              products: [], // Initialize with an empty array
            });
          });
        }
      })
      .addCase(FetchAllCategories.rejected, (state, action) => {
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
      .addCase(FetchAllProductsByCategory.pending, (state, action) => {
        if (state.loading === 'idle') {
          state.loading = 'pending';
          state.error = null;
          state.currentRequestId = action.meta.requestId;
        }
      })
      .addCase(FetchAllProductsByCategory.fulfilled, (state, action) => {
        const {requestId} = action.meta;
        if (
          state.loading === 'pending' &&
          state.currentRequestId === requestId
        ) {
          state.loading = 'idle';
          state.currentRequestId = undefined;
          const categoryName = action.meta.arg;
          const existingCategory = state.entities.find(
            category => category.name === formatCategory(categoryName),
          );
          if (existingCategory) {
            existingCategory.products = action.payload.products;
          } else {
            console.error(`Category '${categoryName}' not found.`);
          }
        }
      })
      .addCase(FetchAllProductsByCategory.rejected, (state, action) => {
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
  addProductToCart_CategoriesSlice,
  removeProductFromCart_CategoriesSlice,
  clearAll_CategoriesSlice,
} = CategoriesSlice.actions;
export default CategoriesSlice.reducer;
