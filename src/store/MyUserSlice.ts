import {createSlice} from '@reduxjs/toolkit';

interface MyUserStateT {
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  image: string | null;
}
const initialMyUserState = {
  firstName: '',
  lastName: '',
  username: '',
  password: '',
  image: null,
} as MyUserStateT;

const MyUserSlice = createSlice({
  name: 'MyUser',
  initialState: initialMyUserState,
  reducers: {
    setUser: (state, action) => {
      return {...state, ...action.payload};
    },
    clearAll_MyUserSlice: () => initialMyUserState,
  },
});

export const {setUser, clearAll_MyUserSlice} = MyUserSlice.actions;
export default MyUserSlice.reducer;
