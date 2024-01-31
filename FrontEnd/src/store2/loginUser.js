import { createSlice } from '@reduxjs/toolkit';

const initialUserState = {
  user: {
    id: '1234',
    name: '제노예요',
  },
};

const loginUserSlice = createSlice({
  name: 'user',
  initialState: initialUserState,
  reducers: {
    loginUser: (state, action) => {
      state.user = action.payload;
    },
    logoutUser: (state) => {
      state.user = null;
    },
  },
});

export const { loginUser, logoutUser } = loginUserSlice.actions;
export default loginUserSlice.reducer;
