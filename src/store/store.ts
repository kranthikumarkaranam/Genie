import {configureStore} from '@reduxjs/toolkit';
import ApiUserSlice from './ApiUserSlice';
import MyUserSlice from './MyUserSlice';
import ProductsSlice from './ProductsSlice';
import CategoriesSlice from './CategoriesSlice';

export const store = configureStore({
  reducer: {
    ApiUser: ApiUserSlice,
    MyUser: MyUserSlice,
    Products: ProductsSlice,
    Categories: CategoriesSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
