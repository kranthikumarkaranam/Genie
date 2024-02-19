import {createSlice} from '@reduxjs/toolkit';
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
  reducers: {},
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

export const {} = CategoriesSlice.actions;
export default CategoriesSlice.reducer;
