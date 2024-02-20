import {createSlice} from '@reduxjs/toolkit';
import {ApiErrorsT, userApiT} from '../types/api-Types';
import {RootState} from './store';
import {createAppAsyncThunk} from './pre-Typed';
import {storeT} from '../types/store-Types';
import constants from '../util/constants';

interface ApiUserStateT extends storeT {
  entities: userApiT;
}

const initialApiUserState: ApiUserStateT = {
  entities: {
    id: 0,
    username: '',
    email: '',
    firstName: '',
    lastName: '',
    gender: '',
    image: '',
    token: '',
  },
  loading: 'idle',
  currentRequestId: undefined,
  error: null,
};

export type ValidateUserT = {
  username: string;
  password: string;
};

export const ValidateUser = createAppAsyncThunk<
  // We can use the first type-parameter to tell what type will be returned as a result.
  userApiT,
  //
  // The second type-parameter tells what argument does the inside function take.
  ValidateUserT
  //
  // The third type-parameter is an object with:
  // `{dispatch?, state?, extra?, rejectValue?}`` fields.
  //
  // `extra` is useful when we need to pass
  // some static data to the request function,
  // like jwt-token or HTTP-headers.
  //
  // REFER THIS LINK -->  https://redux-toolkit.js.org/usage/usage-with-typescript#typing-the-thunkapi-object
>(
  'ApiUser/validateUser',
  async (userCredentials, {rejectWithValue, getState, requestId}) => {
    const {username, password} = userCredentials;
    const {currentRequestId, loading} = getState().ApiUser;
    if (loading !== 'pending' || requestId !== currentRequestId) {
      return rejectWithValue({errorMessage: 'Request canceled or pending'}); // return with an error message
    }
    const response = await fetch(`${constants.API_KEY}/auth/login`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        username,
        password,
      }),
    });
    // Inferred return type: Promise<userApiT>
    return (await response.json()) as userApiT;
  },
);

const ApiUserSlice = createSlice({
  name: 'ApiUser',
  initialState: initialApiUserState,
  reducers: {
    clearAll_ApiUserSlice: () => initialApiUserState,
  },
  extraReducers: builder => {
    // When we send a request, `ValidateUser.pending` is being fired:
    builder
      .addCase(ValidateUser.pending, (state, action) => {
        // At that moment, we change loading status to `pending` and clear all the previous errors:
        if (state.loading === 'idle') {
          state.loading = 'pending';
          state.error = null;
          state.currentRequestId = action.meta.requestId;
        }
      })
      // When a server responses with the data, `ValidateUser.fulfilled` is fired:
      .addCase(ValidateUser.fulfilled, (state, action) => {
        const {requestId} = action.meta;
        // We add the payload to the state and change loading status back to `idle`:
        if (
          state.loading === 'pending' &&
          state.currentRequestId === requestId
        ) {
          state.loading = 'idle';
          state.currentRequestId = undefined;
          state.entities = action.payload;
        }
      })
      // When a server responses with an error, `ValidateUser.fulfilled` is fired:
      .addCase(ValidateUser.rejected, (state, action) => {
        const {requestId} = action.meta;
        // We store the error message and change loading status back to `idle`.
        if (
          state.loading === 'pending' &&
          state.currentRequestId === requestId
        ) {
          state.loading = 'idle';
          state.currentRequestId = undefined;
          // Here we cen get the error message from the rejected promise payload,
          // bcz of using rejectWithValue in error handling of payloadCreator
          if (action.payload) {
            state.error = action.payload.errorMessage;
          } else {
            state.error = action.error.message;
          }
        }
      });
  },
});

export const {clearAll_ApiUserSlice} = ApiUserSlice.actions;
export default ApiUserSlice.reducer;

/* =======  Write selectors here if you want ======= */
